import optparse, os, sys

from detector_integration_api import DetectorIntegrationClient

from pathlib import Path

from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask import Flask, send_from_directory


__author__ = 'hax_damiani'

app = Flask(__name__)
CORS(app)

#turn the flask app into a socketio app
socketio = SocketIO(app)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/', methods=['GET'])
@app.route('/config', methods=['GET'])
def root():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404

@socketio.on('newConfigurationFromClient')
def new_config_from_client(json, methods=['GET', 'POST']):
    api_det_address = json['det_api_address']
    # created the detector integration client object with the address of interest
    client = DetectorIntegrationClient(api_det_address)
    # sets new configuration
    try:
        client.stop()
        client.set_config(json['configuration'])
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'no'})
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        # updates the showing configuration on the client side.
        jsonConfig = client.get_config()
        # emits updated writer configuration
        socketio.emit('newConfigStatus', {'state':jsonConfig['state'], 'status':jsonConfig['status']})
        # emits updated writer configuration
        socketio.emit('newConfigWriterData', jsonConfig['config']['writer'])
        # emits updated detector configuration
        socketio.emit('newConfigDetectorData', jsonConfig['config']['detector'])
        # emits updated backend configuration
        socketio.emit('newConfigBackendData', jsonConfig['config']['backend'])
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})

@socketio.on('emitStop')
def stop_from_client(json, methods=['GET', 'POST']):
    api_det_address = json['det_api_address']
    # created the detector integration client object with the address of interest
    client = DetectorIntegrationClient(api_det_address)
    # stopping the client
    try:
        client.stop()
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'no'})
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        # updates the showing configuration on the client side.
        jsonConfig = client.get_config()
        # emits updated writer configuration
        socketio.emit('newConfigStatus', {'state':jsonConfig['state'], 'status':jsonConfig['status']})
        # emits updated writer configuration
        socketio.emit('newConfigWriterData', jsonConfig['config']['writer'])
        # emits updated detector configuration
        socketio.emit('newConfigDetectorData', jsonConfig['config']['detector'])
        # emits updated backend configuration
        socketio.emit('newConfigBackendData', jsonConfig['config']['backend'])
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})

@socketio.on('setDetectorConfigScript')
def set_detector_config(json, methods=['GET', 'POST']):
    # gets which script file to run
    det_model = json['detector_model']
    try:
        # runs the set detector config with the desired configuration model
        #TODO 
        os.system("sh run_detector_config.sh "+det_model)
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'no'})
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})

@socketio.on('emitStartDiaService')
def start_dia_script(json, methods=['GET', 'POST']):
    try:
        # starts dia service #TODO
        #os.system("systemctl start dia.service")
        os.system("sh start_dia.sh")
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'no'})
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        # Dia now running
        api_det_address = json['det_api_address']
        # created the detector integration client object with the address of interest
        client = DetectorIntegrationClient(api_det_address)
        jsonConfig = client.get_config()
        # emits updated writer configuration
        socketio.emit('newConfigStatus', {'state':jsonConfig['state'], 'status':jsonConfig['status']})
        # emits updated writer configuration
        socketio.emit('newConfigWriterData', jsonConfig['config']['writer'])
        # emits updated detector configuration
        socketio.emit('newConfigDetectorData', jsonConfig['config']['detector'])
        # emits updated backend configuration
        socketio.emit('newConfigBackendData', jsonConfig['config']['backend'])
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})


@socketio.on('emitStart')
def start_from_client(json, methods=['GET', 'POST']):
    api_det_address = json['det_api_address']
    # created the detector integration client object with the address of interest
    client = DetectorIntegrationClient(api_det_address)
    # starting the client
    try:
        client.start()
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'no'})
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        # updates the showing configuration on the client side.
        jsonConfig = client.get_config()
        # emits updated writer configuration
        socketio.emit('newConfigStatus', {'state':jsonConfig['state'], 'status':jsonConfig['status']})
        # emits updated writer configuration
        socketio.emit('newConfigWriterData', jsonConfig['config']['writer'])
        # emits updated detector configuration
        socketio.emit('newConfigDetectorData', jsonConfig['config']['detector'])
        # emits updated backend configuration
        socketio.emit('newConfigBackendData', jsonConfig['config']['backend'])
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})

@socketio.on('emitReset')
def start_from_client(json, methods=['GET', 'POST']):
    api_det_address = json['det_api_address']
    # created the detector integration client object with the address of interest
    client = DetectorIntegrationClient(api_det_address)
    # reseting the client
    try:
        client.reset()
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'no'})
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        # updates the showing configuration on the client side.
        jsonConfig = client.get_config()
        # emits updated writer configuration
        socketio.emit('newConfigStatus', {'state':jsonConfig['state'], 'status':jsonConfig['status']})
        # emits updated writer configuration
        socketio.emit('newConfigWriterData', jsonConfig['config']['writer'])
        # emits updated detector configuration
        socketio.emit('newConfigDetectorData', jsonConfig['config']['detector'])
        # emits updated backend configuration
        socketio.emit('newConfigBackendData', jsonConfig['config']['backend'])
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})

@socketio.on('emitLoad')
def get_diaConfig(json, methods=['GET', 'POST']):
    # gets address value from the detector api of interest
    api_det_address = json['det_api_address']
    # created the detector integration client object with the address of interest
    client = DetectorIntegrationClient(api_det_address)
    # get configuration from server
    try:
        jsonConfig = client.get_config()
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'yes'})
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        # emits updated writer configuration
        socketio.emit('newConfigStatus', {'state':jsonConfig['state'], 'status':jsonConfig['status']})
        # emits updated writer configuration
        socketio.emit('newConfigWriterData', jsonConfig['config']['writer'])
        # emits updated detector configuration
        socketio.emit('newConfigDetectorData', jsonConfig['config']['detector'])
        # emits updated backend configuration
        socketio.emit('newConfigBackendData', jsonConfig['config']['backend'])
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})

@socketio.on('requestDiaLog')
def get_diaLog(json, methods=['GET', 'POST']):
    #TODO
    dia_log_file = Path("./dia_service.log")
    if dia_log_file.is_file() and len(open(dia_log_file, 'r').read()) > 0:
        diaLogContent = open(dia_log_file, 'r').read()
        # emits writer start configuration
        socketio.emit('sendingDiaLog', diaLogContent)
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        socketio.emit('problemWithRequest', {'status':'Dia log file does not exists or it is empty.', 'start_dia_option':'no'})


# @socketio.on('emitClearStatisticsBuffer')
# def clearStatisticsBuffer(json, methods=['GET', 'POST']):
#     # gets address value from the detector api of interest
#     api_det_address = json['det_api_address']
#     # created the detector integration client object with the address of interest
#     client = DetectorIntegrationClient(api_det_address)
#     try:
#         json = client.clear_statistics_buffer()
#     except Exception as e:
#         # emits problem
#         socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'no'})
#         # emits finished request
#         socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
#     else:
#         # emits finished request
#         socketio.emit('finishedRequestSuccessfully', {'status':'ok'})

# @socketio.on('emitGetStatisticsStart')
# def get_StatisticsStart(json, methods=['GET', 'POST']):
#     # gets address value from the detector api of interest
#     api_det_address = json['det_api_address']
#     # created the detector integration client object with the address of interest
#     client = DetectorIntegrationClient(api_det_address)
#     # get configuration from server
#     try:
#         jsonStats = client.get_statisticsStart()
#     except Exception as e:
#         # emits problem
#         socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'caraio'})
#         # emits finished request
#         socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
#     else:
#         if jsonStats['statistics'] != None:
#             idStats = jsonStats['statistics']
#             # checks for the group
#             if "statistics_wr_start" in idStats:
#                 # emits writer start configuration
#                 socketio.emit('newStatisticsWriterStart', idStats['statistics_wr_start'])
#                 # emits finished request
#                 socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
#             else:
#                 socketio.emit('problemWithRequest', {'status':'Problem with statistics json request.', 'start_dia_option':'no'})

# @socketio.on('emitGetStatistics')
# def get_Statistics(json, methods=['GET', 'POST']):
#     # gets address value from the detector api of interest
#     api_det_address = json['det_api_address']
#     # created the detector integration client object with the address of interest
#     client = DetectorIntegrationClient(api_det_address)
#     # get configuration from server
#     try:
#         jsonStats = client.get_statistics()
#     except Exception as e:
#         # emits problem
#         socketio.emit('problemWithRequest', {'status':'{0}'.format(e), 'start_dia_option':'no'})
#         # emits finished request
#         socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
#     else:
#         if jsonStats['statistics'] != None:
#             idStats = jsonStats['statistics']
#             # checks for the group
#             if "statistics_wr_start" in idStats:
#                 # emits writer start configuration
#                 socketio.emit('newStatisticsWriterStart', idStats['statistics_wr_start'])
#                 # emits finished request
#                 socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
#             elif 'statistics_wr_finish' in idStats:
#                 # emits writer finish configuration
#                 socketio.emit('newStatisticsWriterFinish', idStats['statistics_wr_finish'])
#                 # emits finished request
#                 socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
#             elif 'statistics_wr_error' in idStats:
#                 # emits writer error configuration
#                 socketio.emit('newStatisticsWriterError', idStats['statistics_wr_error'])
#                 # emits finished request
#                 socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
#             elif 'statistics_wr_adv' in idStats:
#                 # emits writer statistics adv configuration
#                 socketio.emit('newStatisticsWriterAdv', idStats['statistics_wr_adv'])
#                 # emits finished request
#                 socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
#             else: 
#                 socketio.emit('problemWithRequest', {'status':'Problem with statistics json request.', 'start_dia_option':'no'})


def main():
    # Default host
    default_host="0.0.0.0"
    # Default port
    default_port="5010"

    parser = optparse.OptionParser()
    parser.add_option("-H", "--host",
        help="Hostname of the Flask app " + \
            "[default %s]" % default_host,
        default=default_host)
    parser.add_option("-p", "--port",
        help="Port for the Flask app " + \
            "[default %s]" % default_port,
        default=default_port)

    parser.add_option("-d", "--debug",
        action="store_true", dest="debug",
        help=optparse.SUPPRESS_HELP)
    options, _ = parser.parse_args()

    socketio.run(app,
        debug=bool(options.debug),
        host=options.host,
        port=int(options.port))

if __name__ == '__main__':
    main()