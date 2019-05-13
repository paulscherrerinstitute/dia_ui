from detector_integration_api import DetectorIntegrationClient


# Address of our api server.
api_address = "http://0.0.0.0:10000"

# Initialize the client.
client = DetectorIntegrationClient(api_address)

# Get the status of the integration.
status = client.get_status()

# Check if the integration is in the READY state.
if status != "IntegrationStatus.READY":
    # Resetting the integration will bring us to the IntegrationStatus.INITIALIZED state.
    client.reset()

# Define the config for the writer.
writer_config = {"output_file": "/tmp/test.h5",
                 "n_frames": 100,
                 "user_id": 10001}

# Define the config for the backend.
backend_config = {"bit_depth": 16,
                  "n_frames": 100}

# Define the config for the detector.
detector_config = {"period": 0.1,
                   "frames": 100,
                   "exptime": 0.01,
                   "cycles": 100,
                   "timing": "gating",
                   "dr": 16}
                   
configuration = {"writer": writer_config,
                 "backend": backend_config,
                 "detector": detector_config}

# Send the config to the writer, backend and detector. 
# This changes the integration to IntegrationStatus.CONFIGURED state
client.set_config(configuration)