from copy import copy
from logging import getLogger

from detector_integration_api import default_validator
from detector_integration_api.default_validator import IntegrationStatus
from detector_integration_api.utils import check_for_target_status  
from detector_integration_api.config import ROUTES

import threading
from collections import deque

import zmq, json
from time import sleep

_logger = getLogger(__name__)
buffer = deque(maxlen=1000)

# Class to receive each message and add it to the global buffer
class MessagesMonitorThread(threading.Thread):

    def __init__(self, logger, socket, buffer,):
        threading.Thread.__init__(self)
        self._socket = socket
        self._buffer= buffer
        self._logger = logger

    def run(self):
        while True:
            #  Wait for next msg from client
            topic = self._socket.recv_string()
            frame = self._socket.recv_json()
            self._buffer.append(frame)

            


class StatisticsMonitor(object):
    def __init__(self, host, port):
        self._host = host
        self._port = port
        self._startData = ""

    def start_monitor(self):
        _logger.info("Starting statistics monitor.")
        # zmq socket binding
        context = zmq.Context()

        # Socket
        socket = context.socket(zmq.SUB)
        socket.connect("tcp://localhost:8088" )
        socket.setsockopt(zmq.SUBSCRIBE, b'statisticsWriter')
        socket.setsockopt(zmq.SUBSCRIBE, b'statisticsBackend')
        socket.setsockopt(zmq.SUBSCRIBE, b'statisticsDetector')

        # start processing thread with global buffer writer
        global buffer
        thread_monitor = MessagesMonitorThread(_logger, socket, buffer)
        thread_monitor.start()

    def get_statistics(self, status):
        global buffer
        if len(buffer) > 0:
            item = buffer.popleft()
            return item

    def clear_buffers(self):
        _logger.info("Clearing statistics buffer.")
        global buffer
        buffer.clear()

    def buffer_length(self):
        global buffer
        return len(buffer)

    def set_statisticsStart(self, json):
        self._startData = json

    def get_statisticsStart(self):
        return self._startData
