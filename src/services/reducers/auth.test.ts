import { authReducer as reducer, initialState } from './auth';
import * as types from '../actions/auth';

describe('test auth reducer', () => {

    it('set user', () => {
        const user = {
            email: "qwerty@mail.ru",
            name: "qwerty1"
        }
        expect(reducer(undefined, { type: types.SET_USER, user })).toEqual({
            ...initialState,
            user
        })
    })
})