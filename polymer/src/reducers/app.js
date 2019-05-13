const initialState = {
    beamEnergy: 5.0,
    problemLoadingConfig: "",
    statistics: {
        "statistics":"Test"
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

const app = (state, action) => {
    switch (action.type){
        case 'ADD': {
            return {...state, todos: [...state.todos, action.payload]}
        }
        case 'REMOVE':{
            return {...state, todos: [...state.todos.filter((it, index) => index !== action.payload)]}
        }
        case 'UPDATE_BEAM':{
            return {...state, beamEnergy: action.payload}
        }
        case 'UPDATE_DETECTOR_CONFIG':{
            return {...state, detector_config: action.payload}
        }
        case 'UPDATE_STATUS_CONFIG':{
            return {...state, status_config: action.payload}
        }
        case 'UPDATE_WRITER_CONFIG':{
            return {...state, writer_config: action.payload}
        }
        case 'UPDATE_STATISTICS':{
            return {...state, statistics: action.payload}
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