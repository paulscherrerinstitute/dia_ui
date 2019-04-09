const initialState = {
    todos: ["teste", "demo", "CARAI"],
    beamEnergy: 5.0,
    myJson: {
        "name":"John",
        "age":30,
        "food": ["pizza", "pasta", "pesto"]
       }
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
        default:
            return initialState
    }
}

export default app;