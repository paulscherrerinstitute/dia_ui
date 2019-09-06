# DIA User Interface

Detector Integration API User Interface project is a webserver for control, debug and visualization of the Detector Integration API. 

It's based on [Python Flask](http://flask.pocoo.org/) and [Polymer 3.0](https://www.polymer-project.org/). It also uses [Socket.io](https://socket.io/) for server-client communication, [Redux](https://redux.js.org/) for information management and [Highcharts.js](https://www.highcharts.com/) for data visualization.

## Useful info for users
- Usage address: TO_BE_DEFINED

## Development
- Flask microframework serves per default a static folder, therefore, a symbolic link to the build folder is created. The folder `polymer/build/es6-bundled` is then represented by the `static` and served by the flask server.
- The files are located in the `polymer` folder and after changes it is necessary to run `polymer build`.

### Prerequisites

You will need [git](www.git.org), [anaconda](https://www.anaconda.com/distribution/), [conda](https://docs.conda.io/en/latest/), [NodeJS](https://nodejs.org/en/), [npm](https://www.npmjs.com/).

### Installing

To try out the DIA User Interface clone the repository and set up the anaconda virtual environment:

    ```bash
    $ git clone https://github.com/paulscherrerinstitute/dia_ui.git && cd dia_ui
    ```

Then, run the installation script to create a new environment with all the depencies necessaries to run DIA UI (it will also activate the newly created environment after the installation):

    ```bash
    $ install.sh
    ```

> The new environment is called dia_ui, to deactivate it type ```conda deactivate```.


### Run locally

To start the system locally (from git root directory):

    ```
    $ start_locally.sh
    ```

    > this script automatically configures the terminal into multiple windows and start the python flask webserver and the DIA debug server.

Alternatively:
    - Start the python flask webserver:
    ```
    python start_server.py -H <HOST> -P <PORT> -S <SOURCE_STREAM_PORT> -O <SOURCE_STREAM_HOST>
    ```
    > **Note**: Default values for `<HOST>`, `<PORT>`, `<SOURCE_STREAM_PORT>` and `<SOURCE_STREAM_HOST>` are 127.0.0.1, 5000, 8888, and 127.0.0.1 respectively.

    - Start the detection integration api debug server:
    ```
    $ python detector_integration_api/detector_integration_api/start_default_server.py
    ```

#### Setting the configuration into the debug server:
To set a debug configuration into dia:
    ```
    $ python set_debug_server_config.py
    ```

#### Sending writer statistics:
To send writer statistics:
    ```
    $ python writer_stats_zmq_push.py
    ```

-------------------------
### Running the tests
- To be implemented...

-------------------------
## Changelog

See file `CHANGES.rst`.

-------------------------
## Contact
If you have questions, please contact ```leonardo.hax@psi.ch```






