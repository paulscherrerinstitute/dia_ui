from copy import copy
from logging import getLogger
from time import sleep, gmtime, strftime
from random import randint
from detector_integration_api import default_validator
from detector_integration_api.common.client_disable_wrapper import ClientDisableWrapper
from detector_integration_api.default_validator import IntegrationStatus
from detector_integration_api.utils import check_for_target_status
from detector_integration_api.statistics import StatisticsMonitor

_logger = getLogger(__name__)


class IntegrationManager(object):
    def __init__(self, backend_client, writer_client, detector_client, statistics_monitor):
        self.backend_client = ClientDisableWrapper(backend_client)
        self.writer_client = ClientDisableWrapper(writer_client)
        self.detector_client = ClientDisableWrapper(detector_client)

        self._last_set_backend_config = {}
        self._last_set_writer_config = {}
        self._last_set_detector_config = {}

        self.last_config_successful = False

        self.statisticsMonitor = statistics_monitor

    def start_acquisition(self):
        _logger.info("Starting acquisition.")

        status = self.get_acquisition_status()
        if status != IntegrationStatus.READY:
            raise ValueError("Cannot start acquisition in %s state. Please configure first." % status)

        self.backend_client.open()
        self.writer_client.start()
        self.detector_client.start()     

        writerStartJson = {"statistics_wr_start": {
            "first_frame_id": randint(0, 9),
            "n_frames": 100,
            "output_file": "tmp/file_name",
            "user_id": randint(10000, 999999),
            "enable": "true",
            "timestamp": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
            "compression_method": "comp_name"}
            }

        _logger.info("SAVING START JSON...")
        self.statisticsMonitor.set_statisticsStart(writerStartJson)



        # We need the status FINISHED for very short acquisitions.
        return check_for_target_status(self.get_acquisition_status,
                                       (IntegrationStatus.RUNNING,
                                        IntegrationStatus.READY))

    def stop_acquisition(self):
        _logger.info("Stopping acquisition.")

        status = self.get_acquisition_status()

        if status == IntegrationStatus.RUNNING:
            self.detector_client.stop()
            self.backend_client.close()
            self.writer_client.stop()

        return self.reset()

    def get_acquisition_status(self):
        status = default_validator.interpret_status(self.get_status_details())
        return status

    def get_statisticsStart(self):
        statistics = self.statisticsMonitor.get_statisticsStart()
        return statistics

    def get_statistics(self, status):
        statistics = self.statisticsMonitor.get_statistics(status)
        return statistics

    def clear_buffers(self):
        self.statisticsMonitor.clear_buffers()

    def get_acquisition_status_string(self):
        return str(self.get_acquisition_status())

    def get_status_details(self):
        _logger.info("Getting status details.")

        writer_status = self.writer_client.get_status() \
            if self.writer_client.is_client_enabled() else ClientDisableWrapper.STATUS_DISABLED

        backend_status = self.backend_client.get_status() \
            if self.backend_client.is_client_enabled() else ClientDisableWrapper.STATUS_DISABLED

        detector_status = self.detector_client.get_status() \
            if self.detector_client.is_client_enabled() else ClientDisableWrapper.STATUS_DISABLED

        _logger.debug("Detailed status requested:\nWriter: %s\nBackend: %s\nDetector: %s",
                      writer_status, backend_status, detector_status)

        return {"writer": writer_status,
                "backend": backend_status,
                "detector": detector_status}

    def get_acquisition_config(self):
        # Always return a copy - we do not want this to be updated.
        return {"writer": copy(self._last_set_writer_config),
                "backend": copy(self._last_set_backend_config),
                "detector": copy(self._last_set_detector_config)}

    def set_acquisition_config(self, new_config):

        if {"writer", "backend", "detector"} != set(new_config):
            raise ValueError("Specify config JSON with 3 root elements: 'writer', 'backend', 'detector'.")

        writer_config = new_config["writer"]
        backend_config = new_config["backend"]
        detector_config = new_config["detector"]

        status = self.get_acquisition_status()

        self.last_config_successful = False
        

        if status != IntegrationStatus.READY:
            raise ValueError("Cannot set config in status %s. Please reset() first." % status)

        # The backend is configurable only in the INITIALIZED state.
        if status == IntegrationStatus.READY:
            _logger.debug("Integration status is %s. Resetting before applying config.", status)
            self.reset()

        _logger.info("Set acquisition configuration:\n"
                           "Writer config: %s\n"
                           "Backend config: %s\n"
                           "Detector config: %s\n",
                           writer_config, backend_config, detector_config)

        # Before setting the new config, validate the provided values. All must be valid.
        if self.writer_client.client_enabled:
            default_validator.validate_writer_config(writer_config)

        if self.backend_client.client_enabled:
            default_validator.validate_backend_config(backend_config)

        if self.detector_client.client_enabled:
            default_validator.validate_detector_config(detector_config)

        default_validator.validate_configs_dependencies(writer_config, backend_config, detector_config)

        self.backend_client.set_config(backend_config)
        self._last_set_backend_config = backend_config

        self.writer_client.set_parameters(writer_config)
        self._last_set_writer_config = writer_config

        self.detector_client.set_config(detector_config)
        self._last_set_detector_config = detector_config

        self.last_config_successful = True

        return check_for_target_status(self.get_acquisition_status, IntegrationStatus.READY)

    def update_acquisition_config(self, config_updates):
        current_config = self.get_acquisition_config()

        _logger.debug("Updating acquisition config: %s", current_config)

        def update_config_section(section_name):
            if section_name in config_updates and config_updates.get(section_name):
                current_config[section_name].update(config_updates[section_name])

        update_config_section("writer")
        update_config_section("backend")
        update_config_section("detector")

        self.set_acquisition_config(current_config)

        return check_for_target_status(self.get_acquisition_status, IntegrationStatus.READY)

    def set_clients_enabled(self, client_status):

        if "backend" in client_status:
            self.backend_client.set_client_enabled(client_status["backend"])
            _logger.info("Backend client enable=%s.", self.backend_client.is_client_enabled())

        if "writer" in client_status:
            self.writer_client.set_client_enabled(client_status["writer"])
            _logger.info("Writer client enable=%s.", self.writer_client.is_client_enabled())

        if "detector" in client_status:
            self.detector_client.set_client_enabled(client_status["detector"])
            _logger.info("Detector client enable=%s.", self.detector_client.is_client_enabled())

    def get_clients_enabled(self):
        return {"backend": self.backend_client.is_client_enabled(),
                "writer": self.writer_client.is_client_enabled(),
                "detector": self.detector_client.is_client_enabled()}

    def reset(self):
        _logger.info("Resetting integration api.")

        self.last_config_successful = False

        self.detector_client.stop()

        self.backend_client.reset()

        self.writer_client.reset()

        return check_for_target_status(self.get_acquisition_status, IntegrationStatus.READY)

    def kill(self):
        self.stop_acquisition()

    def get_server_info(self):
        return {
            "clients": {
                "backend_url": self.backend_client.backend_url,
                "writer_url": self.writer_client.url},
            "clients_enabled": self.get_clients_enabled(),
            "validator": "NOT IMPLEMENTED",
            "last_config_successful": self.last_config_successful
        }

    def get_metrics(self):
        # Always return a copy - we do not want this to be updated.
        return {"writer": self.writer_client.get_statistics(),
                "backend": self.backend_client.get_statistics(),
                "detector": self.detector_client.get_statistics()}

    def test_daq(self, test_configuration):
        return test_configuration
