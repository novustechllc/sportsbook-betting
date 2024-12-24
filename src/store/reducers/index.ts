import { combineReducers } from 'redux';

import authReducer from './auth';
import menuReducer from './menu';
import sportsReducer from './sports';
import snackbarReducer from './snackbar';

const reducer = combineReducers({
    auth: authReducer,
    menu: menuReducer,
    sports: sportsReducer,
    snackbar: snackbarReducer
});

export default reducer;
