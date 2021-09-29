import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import * as actions from './auth'
import { enableFetchMocks } from 'jest-fetch-mock'
import fetchMock from 'jest-fetch-mock'
enableFetchMocks()

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions corresponding to auth', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    })

    it('sing in with success', () => {
        const user = {
            email: "qwerty@mail.ru",
            name: "qwerty1"
        }
        //global mock of any fetch method for all resonses
        fetchMock.mockResponse(JSON.stringify({
            success: true,
            user,
            accessToken: "Bearer 123",
            refreshToken: "321"

        }))

        const expectedActions = [
            { type: actions.SET_USER, user }
        ]
        //mock for a store
        const store = mockStore({})
        //dispatch action -> return promise
        return store.dispatch(actions.singIn({ password: "", email: "" })).then(() => {
            //get all generated actions -> compare with expected result
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('sing in with fail', () => {
        const message = "ups..."
        fetchMock.mockReject(new Error(message))
        const expectedActions = [
            { type: actions.SET_MESSAGE, message: "Ошибка: " + message },
            { type: actions.SHOW_MESSAGE }
        ]
        const store = mockStore({})
        return store.dispatch(actions.singIn({ password: "", email: "" }, 'login')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('get user success', () => {
        const user = {
            email: "qwerty@mail.ru",
            name: "qwerty1"
        }
        fetchMock.mockResponse(JSON.stringify({
            success: true,
            user
        }))
        const expectedActions = [
            { type: actions.USER_REQUIRED },
            { type: actions.SET_USER, user },
            { type: actions.USER_LOADED }
        ]

        const store = mockStore({})
        return store.dispatch(actions.getUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('get user failed due to "jwt expired"', () => {
        const user = {
            email: "qwerty@mail.ru",
            name: "qwerty1"
        }
        fetchMock.mockResponses([
            JSON.stringify({
                success: false,
                message: "jwt expired"
            }), { status: 403 }
        ], [
            JSON.stringify({
                success: true,
                accessToken: "Bearer 123",
                refreshToken: "321"
            }), {}
        ], [
            JSON.stringify({
                success: true,
                user
            }), {}
        ])

        const expectedActions = [
            { type: actions.USER_REQUIRED },
            { type: actions.USER_REQUIRED },
            { type: actions.SET_USER, user },
            { type: actions.USER_LOADED }
        ]

        const store = mockStore({})
        return store.dispatch(actions.getUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('get user failed by other reason', () => {
        fetchMock.mockReject(new Error("damn..."))

        const expectedActions = [
            { type: actions.USER_REQUIRED },
            { type: actions.USER_LOADED }
        ]

        const store = mockStore({})
        return store.dispatch(actions.getUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('update token failed durring getUser()', () => {
        fetchMock.mockResponses([
            JSON.stringify({
                success: false,
                message: "jwt expired"
            }), { status: 503 }
        ],
            [
                JSON.stringify({
                    message: "ups..."
                }), { status: 503 }
            ])

        const expectedActions = [
            { type: actions.USER_REQUIRED },
            { type: actions.SET_USER, user: null },
            { type: actions.USER_LOADED }
        ]

        const store = mockStore({})
        return store.dispatch(actions.getUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})