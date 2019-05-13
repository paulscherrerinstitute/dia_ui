import bottle

from detector_integration_api.rest_api.rest_server import register_rest_interface


class MockBackendClient(object):
    def __init__(self):
        self.status = "INITIALIZED"
        self.backend_url = "backend_url"
        self.config = None

    def get_status(self):
        return self.status

    def set_config(self, configuration):
        self.status = "CONFIGURED"
        self.config = configuration

    def open(self):
        self.status = "OPEN"

    def close(self):
        self.status = "CLOSE"

    def reset(self):
        self.status = "INITIALIZED"

    def get_metrics(self):
        return {}


class MockDetectorClient(object):
    def __init__(self):
        self.status = "idle"
        self.config = {}

    def get_status(self):
        return self.status

    def set_config(self, configuration):
        self.config = configuration

    def start(self):
        self.status = "running"

    def stop(self):
        self.status = "idle"

    def get_value(self, name):
        return self.config[name]

    def set_value(self, name, value, no_verification=False):
        self.config[name] = value
        return value


class MockMflowNodesClient(object):
    def __init__(self):
        self.is_running = False
        self._api_address = "writer_url"
        self.config = None

    def get_status(self):
        return {"is_running": self.is_running}

    def set_parameters(self, configuration):
        self.config = configuration

    def start(self):
        self.is_running = True

    def stop(self):
        self.is_running = False

    def reset(self):
        self.is_running = False


class MockExternalProcessClient(object):
    def __init__(self):
        self.status = "stopped"
        self.config = None
        self.url = "http://localhost:10000"

    def start(self):
        self.status = "writing"

    def stop(self):
        self.status = "stopped"

    def get_status(self):
        return self.status

    def set_parameters(self, writer_parameters):
        self.config = writer_parameters

    def reset(self):
        self.status = "stopped"

    def get_statistics(self):
        return {}


def get_test_integration_manager(manager_module):
    backend_client = MockBackendClient()
    detector_client = MockDetectorClient()
    writer_client = MockExternalProcessClient()

    manager = manager_module.IntegrationManager(backend_client, writer_client, detector_client)

    return manager


def start_test_integration_server(host, port, manager_module):
    backend_client = MockBackendClient()
    writer_client = MockExternalProcessClient()
    detector_client = MockDetectorClient()

    integration_manager = manager_module.IntegrationManager(writer_client=writer_client,
                                                            backend_client=backend_client,
                                                            detector_client=detector_client)
    app = bottle.Bottle()
    register_rest_interface(app=app, integration_manager=integration_manager)

    bottle.run(app=app, host=host, port=port)
