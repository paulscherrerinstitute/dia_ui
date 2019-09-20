[![Conda](https://img.shields.io/conda/pn/paulscherrerinstitute/gitutils?color=success)](https://anaconda.org/paulscherrerinstitute/dia_ui) [![GitHub](https://img.shields.io/github/license/paulscherrerinstitute/dia_ui)](https://github.com/paulscherrerinstitute/dia_ui/blob/master/LICENSE) [![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/paulscherrerinstitute/dia_ui/issues/new)


# DIA User Interface OVERVIEW
Detector Integration API User Interface project is a webserver to control, debug and visualize informations related to the Detector Integration API.

It's based on [Python Flask](https://palletsprojects.com/p/flask/) and [Polymer 3.0](https://www.polymer-project.org/). It also uses [Socket.io](https://socket.io/) for server-client communication, [Redux](https://redux.js.org/) for information management and [Highcharts.js](https://www.highcharts.com/) for data visualization.

## Useful info for users

- Usage address: http://xbl-daq-29:5000
- Streamvis: http://xbl-daq-29:5006/csaxs
- [Eiger Manual](http://slsdetectors.web.psi.ch/hardwareDocumentation/Eiger_short.pdf)
- DIA Address: http://xbl-daq-29:10000
- Backend address: xbl-daq-28
- Writer logs: /var/log/h5_zmq_writer/ (on xbl-daq-29)

## xbl-daq-29 (DIA, writer, preview server and DIA UI)
On xbl-daq-29 we are running the detector integration api (DIA) and the user visualization tool (DIA UI).

- The DIA is listening on address: **http://xbl-daq-29:10000**
- The DIA UI is listening on address: **http://xbl-daq-29:5000**

It is run using a **systemd** service (/etc/systemd/system/dia_ui.service). 

The services invokes the startup file **/home/dia_ui/start_dia_ui.sh**.

The service can be controlled with the following commands (using sudo or root):
- **systemctl start dia_ui.service** (start the dia_ui)
- **systemctl stop dia_ui.service** (stop the dia_ui)
- **journalctl -u dia_ui.service -f** (check the dia_ui logs)


## Installing

To try out the DIA UI, we recommend to use it on a conda environment, and install it via the following command:

    $ conda install -c paulscherrerinstitute dia_ui

Once it is installed, you can start it via (host and post are not required):

    $ dia_ui -H <HOST> -P <PORT>

and open the address on any browser. Default is **https://127.0.0.1:5000**.

# Development


## Building the DIAUI package
Clone into the repository or pull the latest changes (if you've already cloned it before). The package can be build via

    $ conda build conda-recipe

Remember to increase the package version before the build (version is defined inside the `init` file on the module's home directory).

After building, the package should be uploaded to the [paulscherrerinstitute channel](https://anaconda.org/paulscherrerinstitute/) on anaconda.org. Execute the command displayed at the end of the build process (similar to the shown below):

    $ anaconda -t <PERSONAL_CONDA_TOKEN> upload <PATH_TO_THE_PACKAGE>

### Locally building
To build the package and test it locally (after building it):

    $ conda install --use-local dia_ui 


## Building the Polymer front end
------------
The files are located in the `polymer` folder and after changes in its source code is necessary to rebuild. Execute the following command (inside the polymer folder):

    $ polymer build

## Flask web application framework static folder

[Flask](https://palletsprojects.com/p/flask/) microframework serves per default a static folder, therefore, a symbolic link to the build folder is created. The folder `dia_ui/polymer/build/es6-bundled` is then represented by the `static` and served by the flask server located on the home directory of the package.

## Run locally

Start the python flask webserver:

    $ python server.py -H <HOST> -P <PORT>

> **Note**: Default values for `<HOST>`, `<PORT>` are 127.0.0.1 and 5000.

and start the detection integration api debug server, navigate to ```diaui/detector_integration_api/detector_integration_api``` and run:

    $ python start_default_server.py


Alternativaly, you can execute the ```start_locally.sh``` script. 

    $ start_locally.sh

> The ```start_locally.sh``` script automatically configures the terminal into multiple windows and start the python flask webserver and the DIA debug server. 


### Setting the configuration into the debug server:
To set a debug configuration into dia:

    $ python set_debug_server_config.py


### Sending writer statistics:
To send writer statistics:

    $ python writer_stats_zmq_push.py

## Changelog
-------------------------
See file `CHANGES.rst`.


## Contact
-------------------------
If you have questions, please contact ```leonardo.hax@psi.ch```