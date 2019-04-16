DEFAULT_LOGGING_LEVEL = "DEBUG"
DEFAULT_SERVER_INTERFACE = "0.0.0.0"
DEFAULT_SERVER_PORT = 10000

DEFAULT_BACKEND_URL = "http://localhost:8080"
DEFAULT_WRITER_URL = "http://localhost:8083"
DEFAULT_BSREAD_URL = "http://localhost:8085"
DEFAULT_WRITER_INSTANCE_NAME = "writer"
DEFAULT_BSREAD_INSTANCE_NAME = "bsread"

BACKEND_URL_SUFFIX = "/v1"
BACKEND_COMMUNICATION_TIMEOUT = 20

# Number of retries when setting the start of the experiment.
N_COLLECT_STATUS_RETRY = 3
# Delay between re-tries.
N_COLLECT_STATUS_RETRY_DELAY = 0.2

# CPP writer settings
EXTERNAL_PROCESS_URL_FORMAT = "http://localhost:%d"

EXTERNAL_PROCESS_STARTUP_WAIT_TIME = 0.2
EXTERNAL_PROCESS_RETRY_DELAY = 0.1
EXTERNAL_PROCESS_RETRY_N = 10

EXTERNAL_PROCESS_COMMUNICATION_TIMEOUT = 2
EXTERNAL_PROCESS_TERMINATE_TIMEOUT = 10

EXTERNAL_PROCESS_LOG_FILENAME_FORMAT = "%s-%s.log"
EXTERNAL_PROCESS_LOG_FILENAME_TIME_FORMAT = "%Y%m%d-%H%M%S"

# Rest API routes.
ROUTES = {
    "html_index": "/",
    "start": "/api/v1/start",
    "stop": "/api/v1/stop",
    "reset": "/api/v1/reset",
    "kill": "/api/v1/kill",

    "get_status": "/api/v1/status",
    "get_status_details": "/api/v1/status_details",

    "get_config": "/api/v1/config",
    "set_config": "/api/v1/config",
    "update_config": "/api/v1/config",
    "set_last_config": "/api/v1/configure",

    "get_detector_value": "/api/v1/detector/value",
    "set_detector_value": "/api/v1/detector/value",

    "get_server_info": "/api/v1/info",

    "get_control_panel_info": "/api/v1/control_panel",

    "get_metrics": "/api/v1/metrics",

    "backend_client": "/api/v1/backend",

    "clients_enabled": "/api/v1/enabled_clients",

    "daq_test": "/api/v1/daq_test"
}
