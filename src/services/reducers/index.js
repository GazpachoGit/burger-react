import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredients';
import { authReducer } from './auth';
import {wsReducer} from './wsReducer';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    auth: authReducer,
    ws: wsReducer 
})