import uuid
from detector_integration_api import DetectorIntegrationClient
from flask_cors import CORS
from flask import Flask, jsonify, request
import copy


COMPONENTS = [
    {
        'id': uuid.uuid4().hex,
        'name': 'DIA',
        'status': 'unknown',
        "state": "--",
        'dr': '--',
    },
    {
        'id': uuid.uuid4().hex,
        'name': 'writer',
        'status': 'unknown',
        'n_frames': '--',
        'output_file': '--',
        'user_id': '--'
    },
    {
        'id': uuid.uuid4().hex,
        'name': 'detector',
        'status': 'unknown',
        'dr': '--',
        'frames': '--',
        'period': '--',
        'exptime': '--',
        'timing': '--',
        'cycles': '--'

    },
    {
        'id': uuid.uuid4().hex,
        'name': 'backend',
        'status': 'unknown',
        'bit_depth': '--',
        'preview_modulo': '--'
    }
]

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

dia_endpoint = 'http://0.0.0.0:10000/'

def update_dia(state, status):
    # update dia
    for i in COMPONENTS:
        if i['name'] == "DIA":
            i['state'] = state
            i['status'] = status

def update_statuses(jsonStatuses):
    for i in COMPONENTS:
        if i['name'] == "writer":
            i['status'] = jsonStatuses.get('details')['writer']
        elif i['name'] == 'backend':
            i['status'] = jsonStatuses.get('details')['backend']
        elif i['name'] == 'backend':
            i['status'] = jsonStatuses.get('details')['detector']
        elif i['name'] == "DIA":
            i['state'] = jsonStatuses.get('state')
            i['status'] = jsonStatuses.get('status')

def update_writer_config(writer_config):
    if writer_config is not None:
        for i in COMPONENTS:
            if i['name'] == "writer":
                i['n_frames'] = writer_config.get('n_frames', '--')
                i['output_file'] = writer_config.get('output_file', '--')
                i['user_id'] = writer_config.get('user_id', '--')

def update_backend_config(backend_config):
    if backend_config is not None:
        for i in COMPONENTS:
            if i['name'] == "backend":
                i['bit_depth'] = backend_config.get('bit_depth', '--')
                i['preview_modulo'] = backend_config.get('preview_modulo', '--')

def update_det_config(det_config):
    if det_config is not None:
        for i in COMPONENTS:
            if i['name'] == "detector":
                i['dr'] = det_config.get('dr', '--')
                i['frames'] = det_config.get('frames', '--')
                i['period'] = det_config.get('period', '--')
                i['exptime'] = det_config.get('exptime', '--')
                i['timing'] = det_config.get('timing', '--')
                i['cycles'] = det_config.get('cycles', '--')


def load_dia_status(client):
    # get configuration from server
    try:
        jsonConfig = client.get_status_details()
    except Exception as e:
        print(e)
    else:
        # updates statuses
        update_statuses(jsonConfig)
        # returns the updated config to the front end
        return jsonify(COMPONENTS)

def load_dia_config(client):
    # get configuration from server
    try:
        jsonConfig = client.get_config()
    except Exception as e:
        print(e)
    else:
        # updates dia
        update_dia(jsonConfig['state'], jsonConfig['status'])
        # updates writer
        update_writer_config(jsonConfig['config'].get('writer'))
        # updates backend
        update_backend_config(jsonConfig['config'].get('backend'))
        # updates detector
        update_backend_config(jsonConfig['config'].get('detector'))
        # returns the updated config to the front end
        return jsonify(COMPONENTS)

# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

@app.route('/api/v1/DIA/comps', methods=['GET'])
def all_comps():
    response_object = {'status': 'success'}
    response_object['comps'] = COMPONENTS
    return jsonify(response_object)

@app.route('/api/v1/DIA/<cmd>/<id>', methods=['GET', 'PUT'])
def cmd_from_ui(cmd,id):
    if request.method == 'PUT':
        if id == 'newConfig':
            # dia client object
            client = DetectorIntegrationClient(dia_endpoint)
            jsonConfig = request.get_json()
            # backend config
            update_backend_config(jsonConfig.get('backend', None))
            # # writer config
            update_writer_config(jsonConfig.get('writer', None))
            # # detector config
            update_det_config(jsonConfig.get('detector', None))
            # sets new configuration based on the COMPONENTS status
            try:
                result = client.set_config(jsonConfig)
            except Exception as e:
                response_object = {'status': 'danger',
                                    'error': str(e)}
                return jsonify(response_object)
            response_object = {'status': 'success'}
            return jsonify(response_object)
    elif request.method == 'GET':
        # dia client object
        client = DetectorIntegrationClient(dia_endpoint)
        try:
            if id == 'start':
                jsonConfig = client.start()
            elif id =='loadconfig':
                load_dia_config(client)
            elif id == 'reset':
                jsonConfig = client.reset()
            elif id == 'stop':
                jsonConfig = client.stop()
        except Exception as e:
            response_object = {'status': 'danger',
                                'error': str(e)}
            return jsonify(response_object)
        # updates components statuses -> REFRESH
        load_dia_status(client)
        response_object = {'status': 'success'}
        return jsonify(response_object)

@app.route('/api/v1/DET/<cmd>/<id>')
def cmd_from_ui_det(cmd,id, methods=['GET']):
    # NOT IMPLEMENTED
    response_object = {'status': 'danger',
                        'error': 'not implemented...'}
    return jsonify(response_object)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)