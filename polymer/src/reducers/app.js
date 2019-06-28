const initialState = {
    beamEnergy: 5.0,
    problemLoadingConfig: "",
    statistics_bsread: {"info": {}},
    statistics_ca_dump: {"info": {}},
    statistics_backend: {"info": {}},
    statistics_detector: {"info": {}},
    statistics_writer: {"info": {}},
    statistics_wr_start: {
        "first_frame_id": 0,
        "n_frames": 0,
        "output_file": "---",
        "user_id": 0,
        "enable": false,
        "timestamp": "----",
        "compression_method": "---"
    },
    statistics_wr_finish: {
        "end_time": "---",
        "enable": false,
        "n_total_written_frames": 0
    },
    statistics_wr_error: {
        "error_def": "---",
        "enable": false,
        "stack_frame": "---",
        "user_msg": "---"
    },
    statistics_wr_adv: {
        "n_written_frames": 0,
        "n_received_frames": 0,
        "n_free_slots": 0,
        "enable": false,
        "processing_rate": 0,
        "receiving_rate": 0,
        "writting_rate": 0,
        "avg_compressed_size": 0
    },
    status_config : {"state": "--",
       "status": "--"},   
    detector_config : {"period": 0.0,
        "frames": 0.0,
        "exptime": 0.0,
        "cycles": 0.0,
        "timing": "--",
        "dr": 0.0},
    backend_config :{"bit_depth": 0,
        "n_frames": 0},
    writer_config : {"output_file": "--",
        "n_frames": 0,
        "user_id": 0}
}

const app = (state=initialState, action) => {
    switch (action.type){
        case 'UPDATE_BEAM':{
            return {...state, beamEnergy: action.payload};
        };
        case 'UPDATE_DETECTOR_CONFIG':{
            return {...state, detector_config: action.payload};
        };
        case 'UPDATE_STATUS_CONFIG':{
            return {...state, status_config: action.payload};
        };
        case 'UPDATE_WRITER_CONFIG':{
            return {...state, writer_config: action.payload};
        };
        case 'UPDATE_STATISTICS_WRITER_START':{
            return {...state, statistics_wr_start: action.payload};
        }
        case 'UPDATE_STATISTICS_WRITER_FINISH':{
            return {...state, statistics_wr_finish: action.payload};
        }
        case 'UPDATE_STATISTICS_WRITER_ERROR':{
            return {...state, statistics_wr_error: action.payload};
        }
        case 'UPDATE_STATISTICS_WRITER_ADV':{
            return {...state, statistics_wr_adv: action.payload};
        }
        case 'UPDATE_BACKEND_CONFIG':{
            return {...state, backend_config: action.payload}
        }
        case 'ERROR_LOADING_CONFIG':{
            return {...state, problemLoadingConfig: action.payload}
        }
        default:
            return initialState
    }
}

export default app;