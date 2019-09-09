# Changelog
All notable changes to this project will be documented in this file.

## [0.0.1] - 2019-09-09

### Added
- Detector integration API user interface (DIAUI) combines flask python backend server, polymer 3.0 front end, redux state container, socket.io real-time engine and highcharts.js data visualization.
- DIAUI's dashboard control panel offers a generic user-input field to connect to the DIA server and control main key features of DIA.
- DIAUI's dashboard configuration panel shows the current configuration loaded from DIA and allows the user to edit and submit updated configuration to the DIA server. It presents the DIA status, writer, detector and backend configurations.
- DIAUI's allow to run scripts to set the detector configuration based on predefined configuration scripts.
- DIAUI's log viewer fetches the log from the server and presents it to the user in a read-only format.

[Unreleased]:
- Integration with statistics monitor from writer/backend/detector...

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)