# DIA User Interface
Detector Integration API User Interface project is a webserver to control, debug and visualize informations related to the Detector Integration API.

It's based on [Python Flask](http://flask.pocoo.org/) and [Polymer 3.0](https://www.polymer-project.org/). It also uses [Socket.io](https://socket.io/) for server-client communication, [Redux](https://redux.js.org/) for information management and [Highcharts.js](https://www.highcharts.com/) for data visualization.

## Useful info for users

- Usage address: TO_BE_DEFINED
- Streamvis: http://xbl-daq-29:5006/csaxs
- [Eiger Manual](http://slsdetectors.web.psi.ch/hardwareDocumentation/Eiger_short.pdf)
- DIA Address: http://xbl-daq-29:10000
- Backend address: xbl-daq-28
- DIA logs: ##
- Writer logs: /var/log/h5_zmq_writer/ (on xbl-daq-29)

## Development
--------------
- Flask microframework serves per default a static folder, therefore, a symbolic link to the build folder is created. The folder `polymer/build/es6-bundled` is then represented by the `static` and served by the flask server.
- The files are located in the `polymer` folder and after changes it is necessary to execute (inside the polymer folder)

    ```
    $ polymer build
    ```

## Installing

To try out the DIA User Interface clone the repository and set up the anaconda virtual environment:


    $ git clone https://github.com/paulscherrerinstitute/dia_ui.git
    $ cd dia_ui


Then, run the installation script to create a new environment with all the depencies necessaries to run DIA UI (it will also activate the newly created environment after the installation):


    $ install.sh

> The new environment is called dia_ui, to activate and deactivate it do:

    # Activate
    $ conda activate dia_ui
    # Deactivate
    $ conda deactivate

### Run locally

Start the python flask webserver:

    $ python start_server.py -H <HOST> -P <PORT>

> **Note**: Default values for `<HOST>`, `<PORT>` are 127.0.0.1 and 5000.

and start the detection integration api debug server, navigate to ```diaui/detector_integration_api/detector_integration_api``` and run:

    $ python start_default_server.py


Alternativaly, you can execute the ```start_locally.sh``` script. 

    $ start_locally.sh

> The ```start_locally.sh``` script automatically configures the terminal into multiple windows and start the python flask webserver and the DIA debug server. 


#### Setting the configuration into the debug server:
To set a debug configuration into dia:

    $ python set_debug_server_config.py


#### Sending writer statistics:
To send writer statistics:

    $ python writer_stats_zmq_push.py


## Changelog
-------------------------
See file `CHANGES.rst`.


## Contact
-------------------------
If you have questions, please contact ```leonardo.hax@psi.ch```