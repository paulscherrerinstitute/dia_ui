#!/bin/bash
# conda create new env
conda create -n diaui
# activates conda environmnet
conda activate diaui
# add anaconda channels
conda config -add channels conda-forge
conda config --add channels paulscherrerinstitute
# install dependencies from anaconda
conda install -c anaconda flask flask-cors
# install dependencies from paulscherrerinstitute
conda install -c paulscherrerinstitute bsread numpy matplotlib
# install dependencies from cf201901
conda install -c conda-forge/label/cf201901 flask-restful flask-socketio python-socketio python-engineio
# installing npm dependencies
cd polymer; npm i; polymer build; cd ..;
