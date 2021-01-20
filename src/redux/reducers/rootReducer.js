import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import pictogramsReducer from './pictograms';
import UsersReducer from './users';
import patientsReducer from './patients';
import routinesReducer from './routines';

const rootReducer = combineReducers({
    categories: categoriesReducer,
    pictograms: pictogramsReducer,
    users: UsersReducer,
    patients: patientsReducer,
    routines: routinesReducer
});

export default rootReducer;