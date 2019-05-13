#!/bin/bash
# opens new tab
new_tab_right(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "d" using command down' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd Software/diaui/polymer"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

new_tab_bottom(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "d" using {command down, shift down}' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd Software/diaui"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

# loads the conda 
load_conda(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "source ~/anaconda3/etc/profile.d/conda.sh"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

# activate diaui environment
activate_diaui(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "conda activate /anaconda3/envs/diaui"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

#starts python flask server
start_flaskserver(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "python server.py"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

# starts the bsread stream
start_bsread_stream(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "python ../bsread_stream/start_stream.py"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

# starts the detector integration debug server
start_detector_debug_server(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd detector_integration_api"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "export PYTHONPATH=`pwd`"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "python detector_integration_api/start_default_server.py"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

sets_debug_server_config(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "python ../set_debug_server_config.py"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}   

move_focus_to_top(){
    osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "[" using {command down}' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "[" using {command down}' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "[" using {command down}' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd polymer"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}   

load_conda
activate_diaui
new_tab_bottom
load_conda
activate_diaui
start_detector_debug_server
new_tab_right
load_conda
activate_diaui
sets_debug_server_config
start_bsread_stream
new_tab_bottom
load_conda
activate_diaui
start_flaskserver
move_focus_to_top
