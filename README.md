[![Conda](https://img.shields.io/conda/pn/paulscherrerinstitute/gitutils?color=success)](https://anaconda.org/paulscherrerinstitute/dia_ui) [![GitHub](https://img.shields.io/github/license/paulscherrerinstitute/dia_ui)](https://github.com/paulscherrerinstitute/dia_ui/blob/master/LICENSE) [![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/paulscherrerinstitute/dia_ui/issues/new)


# DIA User Interface OVERVIEW
Detector Integration API User Interface project is a webserver to control, debug and visualize informations related to the Detector Integration API.

It's based on [Python Flask](https://palletsprojects.com/p/flask/) and [Polymer 3.0](https://www.polymer-project.org/). It also uses [Socket.io](https://socket.io/) for server-client communication, [Redux](https://redux.js.org/) for information management and [Highcharts.js](https://www.highcharts.com/) for data visualization.

## Useful info for users

- DIA User Interface: http://xbl-daq-29:5000
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

    $ python server.py -H <HOST> -p <PORT>

> **Note**: Default values for `<HOST>`, `<PORT>` are 127.0.0.1 and 5000.

and start the detection integration api debug server, navigate to ```diaui/detector_integration_api/detector_integration_api``` and run:

    $ python start_default_server.py


Alternativaly, you can execute the script located on git's home repository:

    $ start_locally.sh

> The ```start_locally.sh``` script automatically configures the terminal into multiple windows and start the python flask webserver and the DIA debug server. After that, go to [127.0.0.1:5000](127.0.0.1:5000).


### [TESTING PURPOSES] Setting the configuration into the debug server:
To set a debug configuration into dia:

    $ python set_debug_server_config.py

> It basically verifies if the DIA server is up and running, and sets a initial configuration, displayed below:

    # Define the config for the writer.
    writer_config = {"output_file": "--",
                    "n_frames": 0,
                    "user_id": 10001}

    # Define the config for the backend.
    backend_config = {"bit_depth": 0,
                    "n_frames": 0}

    # Define the config for the detector.
    detector_config = {"period": 0.0,
                    "frames": 0,
                    "exptime": 0.0,
                    "cycles": 0,
                    "timing": "auto",
                    "dr": 0}

### [TESTING PURPOSES] Sending writer statistics:
To send writer statistics:

    $ python writer_stats_zmq_push.py

> This scripts sends json formats statistics that are displayed on the web interface using highcharts.js. 

The json statistics from the writer can be of four different formats:
- Start:

        writerStartJson = {"statistics_wr_start": {
            "first_frame_id": randint(0, 9),
            "n_frames": 100,
            "output_file": "tmp/file_name",
            "user_id": randint(10000, 999999),
            "enable": "true",
            "timestamp": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
            "compression_method": "comp_name"}
        }

- Error:

        writerErrorJson ={"statistics_wr_error":  {
            "error_def": "text",
            "stack_frame": "text",
            "enable": "true",
            "user_msg": "text"}
        }


- Finish:

        writerFinishJson = {"statistics_wr_finish": {
            "end_time": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
            "enable": "true",
            "n_total_written_frames": i}
        }

- Advanced:

        writerAdvJson ={"statistics_wr_adv": {
            "n_written_frames": i,
            "n_received_frames": randint(0, 9),
            "n_free_slots": randint(0, 9),
            "enable": "true",
            "processing_rate": randint(0, 9),
            "receiving_rate": randint(0, 9),
            "writting_rate": randint(50, 99),
            "avg_compressed_size": randint(0, 9)}
        }

## Changelog
-------------------------
See file `CHANGES.rst`.


## Contact
-------------------------
If you have questions, please contact ```leonardo.hax@psi.ch```