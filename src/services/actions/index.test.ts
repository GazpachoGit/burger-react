import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import * as actions from './index'
import fetchMock from 'jest-fetch-mock'
// import {mainUrl} from '../../utils/constants';
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('async actions corresponding to ingredients', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    })
    it('dispatch GET_INGREDIENTS_SUCCESS on success request result', () => {
        const data = [{
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/,bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/,bun-02-large.png"
        }]
        fetchMock.mockResponse(JSON.stringify({
            success: true,
            data
        }))
        const expectedActions = [
            { type: actions.GET_INGREDIENTS_REQUEST },
            { type: actions.GET_INGREDIENTS_SUCCESS, items: data }
        ]
        const store = mockStore({})
        return store.dispatch(actions.getIngredients()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('dispatch GET_INGREDIENTS_FAILED on reject', () => {
        fetchMock.mockReject(new Error());
        const expectedActions = [
            { type: actions.GET_INGREDIENTS_REQUEST },
            { type: actions.GET_INGREDIENTS_FAILED }
        ]
        const store = mockStore({})
        return store.dispatch(actions.getIngredients
            ()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })
})