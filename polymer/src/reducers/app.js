const initialState = {
    beamEnergy: 5.0,
    problemLoadingConfig: "",
    statistics_bsread: {"info": {}},
    statistics_ca_dump: {"info": {}},
    statistics_backend: {"info": {}},
    statistics_detector: {"info": {}},
    statistics_writer: {"info": {}},
    statistics_wr_start: {
        "first_frame_id": 10,
        "n_frames": 10,
        "output_file": "---",
        "user_id": 10,
        "timestamp": "----",
        "compression_method": "---"
    },
    statistics_wr_finish: {
        "end_time": "---",
        "n_total_written_frames": 10
    },
    statistics_wr_error: {
        "error_def": "---",
        "stack_frame": "---",
        "user_msg": "---"
    },
    statistics_wr_adv: {
        "n_written_frames": 10,
        "n_received_frames": 10,
        "n_free_slots": 10,
        "processing_rate": 10,
        "receiving_rate": 10,
        "writting_rate": 10,
        "avg_compressed_size": 10
    },
    status_config : {"state": "",
       "status": ""},   
    detector_config : {"period": 0.0,
        "frames": 0.0,
        "exptime": 0.0,
        "cycles": 0.0,
        "timing": "auto",
        "dr": 0.0},
    backend_config :{"bit_depth": 0,
        "n_frames": 0},
    writer_config : {"output_file": "/tmp/test.h5",
        "n_frames": 100,
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
            return state
    }
}

export default app;