# DIA User Interface

This is the first version of the Detector Integration API User Interface. It's based on [Python Flask](http://flask.pocoo.org/) and [Polymer 3.0](https://www.polymer-project.org/). It also uses [Socket.io](https://socket.io/) for server-client communication, [Redux](https://redux.js.org/) for information management and [Highcharts.js](https://www.highcharts.com/) for data visualization.

### Prerequisites

You will need [git](www.git.org), [anaconda](https://www.anaconda.com/distribution/), [conda](https://docs.conda.io/en/latest/), [NodeJS](https://nodejs.org/en/), [npm](https://www.npmjs.com/)

### Installing

To try out the DIA User Interface clone the repository and set up the anaconda virtual environment:

```bash
git clone https://github.com/paulscherrerinstitute/dia_ui.git && cd dia_ui
```

Then, run the installation script to create a new environment with all the depencies necessaries to run DIA UI (it will also activate the newly created environment after the installation):

```bash
install_dep.sh
```
> The new environment is called dia_ui, to deactivate it type `conda deactivate`.

-------------------------
## Running the tests
- To be implemented...

-------------------------
## Run locally

- To start the server (from root directory):
```
python start_server.py -H <HOST> -P <PORT> -S <SOURCE_STREAM_PORT> -O <SOURCE_STREAM_HOST>
```

> **Note**: Default values for `<HOST>`, `<PORT>`, `<SOURCE_STREAM_PORT>` and `<SOURCE_STREAM_HOST>` are 127.0.0.1, 5000, 8888, and 127.0.0.1 respectively.

*TESTING PURPOSES ONLY* (this will be removed soon...)
- To start the data generator (from root directory):
```
python bsread_stream/start_stream.py
```
> **Note**: The data generator will generate the stream of data that will be received by the server and passed on to the client. Default configuration will continuously stream images with a delay of 0.1s via 127.0.0.1:8888 (this values are predefined on the server, if changed, please don't forget to update both).

### Data stream generator

This is the protocol we use to transfer beam synchronous data at SwissFEL: [https://github.com/paulscherrerinstitute/bsread_python](https://github.com/paulscherrerinstitute/bsread_python)

> **Note:** You will not be able to access the real BSread stream from outside of PSI. This repository has a stream generator you can use to simulate camera images and metadata you will later display to the clients. 


-------------------------
## Development
- Flask microframework serves per default a static folder, therefore, a symbolic link to the build folder is created. The folder `polymer/build/es6-bundled` is then represented by the `static` and served by the flask server.
- The files are located in the `polymer` folder and after changes it is necessary to run `polymer build`.

-------------------------
## Changelog

See file `CHANGES.rst`.

-------------------------
## Contact
```
leonardo.hax@psi.ch








