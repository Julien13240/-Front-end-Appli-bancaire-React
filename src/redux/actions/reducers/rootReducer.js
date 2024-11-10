import { combineReducers } from 'redux';
import userReducer from './userReducer';


// Combine tous les réducteurs
const rootReducer = combineReducers({
    user: userReducer,

});

export default rootReducer;
