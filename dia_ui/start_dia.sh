#!/bin/bash
DATE=`date '+%d/%m/%Y %H:%M:%S'`
echo "[Start DIA service - ${DATE} ] Dia service started request.. " >> dia_service.log
conda activate /anaconda3/envs/diaui
cd detector_integration_api
export PYTHONPATH=`pwd`
nohup python detector_integration_api/start_default_server.py > ../dia_service.log &
