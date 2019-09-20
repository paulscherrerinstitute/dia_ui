export const saveState = (state) => {
    let json = localStorage.getItem('__test__') || '{}';
    let stringifiedNewState = JSON.stringify(state);
    if (stringifiedNewState != json && stringifiedNewState != '{}'){
        localStorage.setItem('__test__', stringifiedNewState);
    }
}

export const loadState = () => {
    let json;
    // don't load state in testing mode
    if (window.location.hash !== '#test'){
        json = localStorage.getItem('__test__') || '{}';
    }else{
        json = '{}';
    }

    let state = JSON.parse(json)

    if (state) {
        if (state.app) {
            state.app.snackbarOpened = false;
        }
        if (state.data && !state.data.categories) {
            state.data.categories = [];
        }
        return state;
    }else{
        return undefined;
    }
}