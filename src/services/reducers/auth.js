import {SET_USER} from '../actions/auth';

const initialState = {
    user: {
        email: "",
        name: ""
    }
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                user: {
                    email: action.email,
                    name: action.name
                }
            }
        default:
            return state;
    }
}