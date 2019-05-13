from copy import copy
from logging import getLogger

from detector_integration_api import default_validator
from detector_integration_api.default_validator import IntegrationStatus
from detector_integration_api.utils import check_for_target_status  
from detector_integration_api.config import ROUTES

import threading
from collections import deque

import zmq, json

_logger = getLogger(__name__)
buffer = deque(maxlen=20)
lock = threading.Lock()

# Class to receive each message and add it to the global buffer
class MessagesMonitorThread(threading.Thread):

    def __init__(self, socket, buffer):
        threading.Thread.__init__(self)
        self._socket = socket
        self._buffer= buffer

    def run(self):
        while True:
            #  Wait for next request from client
            message = self._socket.recv_json()
            # adds the message to the buffer
            self._buffer.append(message)


class StatisticsMonitor(object):

    def __init__(self, host, port, buffer_len):
        self._host = host
        self._port = port
        
        # TODO address needs to be adjusted/checked
        self._zmq_address = "tcp://%s:%s" % (self._host, self._port)


    def start_monitor(self):
        _logger.info("Starting statistics monitor.")
        # zmq socket binding
        context = zmq.Context()
        socket = context.socket(zmq.PULL)
        socket.connect(self._zmq_address)
        # start processing thread with global buffer
        global buffer
        thread_monitor = MessagesMonitorThread(socket, buffer)
        thread_monitor.start()

    def get_statistics(self, status):
        _logger.info("Getting statistics.")
        
        if status != "IntegrationStatus.RUNNING":
            raise ValueError("Cannot get statistics in %s state. Please configure first." % status)
        global buffer
        prepared = {v: k for v, k in enumerate(buffer)}

        json_stats = json.dumps(dict(prepared))

        return json_stats
    
    def get_events():
        _logger.info("Getting events.")

    def clear_buffer():
        _logger.info("Clearing statistics buffer.")
        global buffer
        buffer.clear()


