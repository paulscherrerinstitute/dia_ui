# Detector Integration API user interface

This projects combines provides DIA functionalities and configuration  of the components.

# Server
1. Run the server-side Flask app (from dia_ui/dia_ui/server):

    
    ```sh
    (diaui)$ python app.py
    ```

    Navigate to [http://localhost:5000](http://localhost:5000)

# Client
1. Run the client-side Vue app (from dia_ui/dia_ui/client):

    ```sh
    $ npm install
    $ npm run serve
    ```

    Navigate to [http://localhost:8080](http://localhost:8080)

# DIA

Default dia address: http://0.0.0.0:10000

1. Run the detector integration api (from dia_ui/dia_ui/server)
    
    ```sh
    (diaui)$ python detector_integration_api/start_default_server.py
    ```
