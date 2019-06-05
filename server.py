import optparse, os

from bsread import source
from detector_integration_api import DetectorIntegrationClient


from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask import Flask, send_from_directory

from threading import Thread, Event

# from detector_integration_api import DetectorIntegrationClient


__author__ = 'hax_damiani'

app = Flask(__name__)
CORS(app)

#turn the flask app into a socketio app
socketio = SocketIO(app)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

# @app.route('/service-worker.js', methods=['GET'])
# def service():
#     return app.send_static_file('./service-worker.js')

@app.route('/', methods=['GET'])
# @app.route('/view1', methods=['GET'])
# @app.route('/view2', methods=['GET'])
@app.route('/config', methods=['GET'])
def root():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404


# Detects a new client connected and start the thread.
@socketio.on('connect')
def test_connect():
    # need visibility of the global thread object
    global thread
    print('Client connected...')
    

    #Start the random number generator thread only if the thread has not been started before.
    if not thread.isAlive():
        print("Starting Thread")
        thread = ClientThread(int(default_port_source), -1, default_host_source)
        thread.start()

# Detecs when a client disconnects
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected...')

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
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e)})
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
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e)})
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
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e)})
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
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e)})
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
def get_detectorConfig(json, methods=['GET', 'POST']):
    # gets address value from the detector api of interest
    api_det_address = json['det_api_address']
    # created the detector integration client object with the address of interest
    client = DetectorIntegrationClient(api_det_address)
    # get configuration from server  
    try:
        jsonConfig = client.get_config()
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e)})
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
    
@socketio.on('emitGetStatistics')
def get_Statistics(json, methods=['GET', 'POST']):
    # gets address value from the detector api of interest
    api_det_address = json['det_api_address']
    # created the detector integration client object with the address of interest
    client = DetectorIntegrationClient(api_det_address)
    # get configuration from server  
    try:
        jsonStats = client.get_statistics()
    except Exception as e:
        # emits problem
        socketio.emit('problemWithRequest', {'status':'{0}'.format(e)})
        # emits finished request
        socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
    else:
        if jsonStats['statistics'] != None:
            idStats = jsonStats['statistics']
            # checks for the group 
            if "statistics_wr_start" in idStats:
                # emits writer start configuration
                socketio.emit('newStatisticsWriterStart', idStats['statistics_wr_start'])
                # emits finished request
                socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
            elif 'statistics_wr_finish' in idStats:
                # emits writer finish configuration
                socketio.emit('newStatisticsWriterFinish', idStats['statistics_wr_finish'])
                # emits finished request
                socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
            elif 'statistics_wr_error' in idStats:
                # emits writer error configuration
                socketio.emit('newStatisticsWriterError', idStats['statistics_wr_error'])
                # emits finished request
                socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
            elif 'statistics_wr_adv' in idStats:
                # emits writer statistics adv configuration
                socketio.emit('newStatisticsWriterAdv', idStats['statistics_wr_adv'])
                # emits finished request
                socketio.emit('finishedRequestSuccessfully', {'status':'ok'})
            else: 
                socketio.emit('problemWithRequest', {'status':'Problem with statistics json request.'})
            # elif "backend" in jsonStats['statistics']:
            #     # to be implemented
            #     print('Requested backend statistics... to be implemented...')
            #     socketio.emit('problemWithRequest', {'status':'Backend statistics not yet implemented...'})
            # elif "detector" in jsonStats['statistics']:
            #     # to be implemented
            #     print('Requested detector statistics... to be implemented...')
            #     socketio.emit('problemWithRequest', {'status':'Detector statistics not yet implemented...'})
            # else:
            #     socketio.emit('problemWithRequest', {'status':'Problem with statistics json file...'})


# Server thread
thread = Thread()
thread_stop_event = Event()

class ClientThread(Thread):
    def __init__(self, port, n_img, stream_host, ):
        super(ClientThread, self).__init__()
        self._delay = 1.5
        self._stream_output_port = port
        self._n_images = n_img
        self._stream_host = stream_host

    def receive_stream(self):
        """
        Function that receives the stream and send the signal for the clients using socketio.
        """
        message = None
        # You always need to specify the host parameter, otherwise bsread will try to access PSI servers.
        with source(host=self._stream_host, port=self._stream_output_port, receive_timeout=1000) as input_stream:

            n_received = 0
            # Detects how many messages are expected
            if self._n_images == -1:
                while True:
                    message = input_stream.receive()
                    # In case of receive timeout (1000 ms in this example), the received data is None.
                    if message is None:
                        continue
                    else:
                        # Creates the image and saves to the file that is shown to the client
                        # pyplot.imshow(message.data.data['image'].value)
                        # pyplot.savefig('./stream_online_viewer/static/images/stream.png')
                        # Increases the number of received messages
                        n_received += 1
                        # Generates the data containing meaningful information to the client
                        data = {'number_of_received_messages':  n_received, 
                                'data': n_received,
                                'messages_received': float(message.statistics.messages_received),
                                'total_bytes_received': float(message.statistics.total_bytes_received),
                                'repetition_rate': float(message.data.data['repetition_rate'].value),
                                'beam_energy': float(message.data.data['beam_energy'].value),
                                'image_size_y': float(message.data.data['image_size_y'].value),
                                'image_size_x': float(message.data.data['image_size_x'].value)
                                }
                        # emits the signal with the data
                        if n_received % 25 == 0:
                            socketio.emit('newBSREAD', data)
                            print("Emit: ", float(message.data.data['beam_energy'].value))
            else:
                for _ in range(self._n_images):
                    message = input_stream.receive()
                    # In case of receive timeout (1000 ms in this example), the received data is None.
                    if message is None:
                        continue
                    else:
                        # Creates the image and saves to the file that is shown to the client
                        # pyplot.imshow(message.data.data['image'].value)
                        # pyplot.savefig('./stream_online_viewer/static/images/stream.png')
                        # Increases the number of received messages
                        n_received += 1
                        # Generates the data containing meaningful information to the client
                        data = {'number_of_received_messages':  n_received, 
                                'data': n_received,
                                'messages_received': float(message.statistics.messages_received),
                                'total_bytes_received': float(message.statistics.total_bytes_received),
                                'repetition_rate': float(message.data.data['repetition_rate'].value),
                                'beam_energy': float(message.data.data['beam_energy'].value),
                                'image_size_y': float(message.data.data['image_size_y'].value),
                                'image_size_x': float(message.data.data['image_size_x'].value)
                                }
                        # emits the signal with the data
                        socketio.emit('newBSREAD', data, namespace='/test')

    def run(self):
        self.receive_stream()

if __name__ == '__main__':
    # Default host 
    default_host="127.0.0.1"
    # Default port
    default_port="5000"
    # Default host stream
    default_host_source="localhost"
    # Default port stream
    default_port_source="8888"
    # Parser of the options
    parser = optparse.OptionParser()
    parser.add_option("-H", "--host",
        help="Hostname of the Flask app " + \
            "[default %s]" % default_host,
        default=default_host)
    parser.add_option("-P", "--port",
        help="Port for the Flask app " + \
            "[default %s]" % default_port,
        default=default_port)
    
    parser.add_option("-O", "--source_host",
        help="host for the source generator " + \
            "[default %s]" % default_host_source,
        default=default_host_source)

    parser.add_option("-S", "--source_port",
        help="Port for the source generator " + \
            "[default %s]" % default_port_source,
        default=default_port_source)

    parser.add_option("-d", "--debug",
        action="store_true", dest="debug",
        help=optparse.SUPPRESS_HELP)
    options, _ = parser.parse_args()

    socketio.run(app,
        debug=True,
        host=options.host,
        port=int(options.port))
