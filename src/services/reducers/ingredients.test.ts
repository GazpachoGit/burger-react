import { ingredientsReducer as reducer, initialState } from './ingredients';
import * as types from '../actions/index';

describe('ingredients reducer', () => {
    it('request ingredients started', () => {
        expect(reducer(undefined, { type: types.GET_INGREDIENTS_REQUEST })).toEqual({
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false
        })
    })
    it('request ingredients failed', () => {
        expect(reducer(undefined, { type: types.GET_INGREDIENTS_FAILED })).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true,
        })
    })
    it('request ingredients success', () => {
        const previousState = {
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false
        }
        const items = [{
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
            image_large: "https://code.s3.yandex.net/react/code/,bun-02-large.png",
            qty: 2
        }];
        expect(reducer(previousState, {
            type: types.GET_INGREDIENTS_SUCCESS,
            items
        })).toEqual({
            ...previousState,
            ingredientsRequest: false,
            ingredients: items
        })
    })
    it('add a component bun initially', () => {
        const bun = {
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
        }
        const previousState = {
            ...initialState,
            ingredients: [bun]
        }
        expect(reducer(previousState, {
            type: types.ADD_COMPONENT,
            item: bun
        })).toEqual({
            ...previousState,
            ingredients: [
                { ...bun, qty: 2 }
            ],
            burgerComponents: {
                bun: bun,
                optional: []
            }
        })
    })
    it('add a component bun with replace', () => {
        const bunOld = {
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
            image_large: "https://code.s3.yandex.net/react/code/,bun-02-large.png",
            qty: 2
        }
        const bunNew = {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png"
        }
        const previousState = {
            ...initialState,
            ingredients: [bunOld, bunNew],
            burgerComponents: {
                bun: bunOld,
                optional: []
            }
        }
        expect(reducer(previousState, {
            type: types.ADD_COMPONENT,
            item: bunNew
        })).toEqual({
            ...previousState,
            ingredients: [
                { ...bunOld, qty: 0 },
                { ...bunNew, qty: 2 }
            ],
            burgerComponents: {
                bun: bunNew,
                optional: []
            }
        })
    })
    it('add a not-bun component initially', () => {
        const optional = {
            _id: "60d3b41abdacab0026a733cb",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png"
        }
        const bun = {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            qty: 2
        }
        const previousState = {
            ...initialState,
            ingredients: [
                bun,
                optional
            ],
            burgerComponents: {
                bun,
                optional: []
            }
        }
        expect(reducer(previousState, {
            type: types.ADD_COMPONENT,
            item: optional
        })).toEqual({
            ...previousState,
            ingredients: [
                bun,
                { ...optional, qty: 1 }
            ],
            burgerComponents: {
                bun,
                optional: [{ ...optional, id: optional._id + "0" }]
            }
        })
    })
    it('add a not-bun component again', () => {
        const optional = {
            _id: "60d3b41abdacab0026a733cb",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
            id: "60d3b41abdacab0026a733cb0",
            qty: 1
        }
        const bun = {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            qty: 2
        }
        const previousState = {
            ...initialState,
            ingredients: [
                bun,
                optional
            ],
            burgerComponents: {
                bun,
                optional: [optional]
            }
        }
        expect(reducer(previousState, {
            type: types.ADD_COMPONENT,
            item: optional
        })).toEqual({
            ...previousState,
            ingredients: [
                bun,
                { ...optional, qty: 2 }
            ],
            burgerComponents: {
                bun,
                optional: [
                    { ...optional, id: optional._id + "0" },
                    { ...optional, id: optional._id + "1" }
                ]
            }
        })
    })
    it('add new not-bun component to the filled optional array', () => {
        const optional = {
            _id: "60d3b41abdacab0026a733cb",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
            id: "60d3b41abdacab0026a733cb0",
            qty: 1
        }
        const bun = {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            qty: 2
        }
        const newOptional = {
            _id: "60d3b41abdacab0026a733d1",
            name: "Плоды Фалленианского дерева",
            type: "main",
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: "https://code.s3.yandex.net/react/code/sp_1.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
        }
        const previousState = {
            ...initialState,
            ingredients: [
                bun,
                optional,
                newOptional
            ],
            burgerComponents: {
                bun,
                optional: [optional]
            }
        }
        expect(reducer(previousState, {
            type: types.ADD_COMPONENT,
            item: newOptional
        })).toEqual({
            ...previousState,
            ingredients: [
                bun,
                optional,
                { ...newOptional, qty: 1 }
            ],
            burgerComponents: {
                bun,
                optional: [optional, { ...newOptional, id: newOptional._id + "1" }]
            }
        })
    })
    it('remove optional', () => {
        const bun = {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            qty: 2
        }
        const optional = {
            _id: "60d3b41abdacab0026a733cb",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
            id: "60d3b41abdacab0026a733cb0",
            qty: 1
        }
        const optional1 = {
            _id: "60d3b41abdacab0026a733d1",
            name: "Плоды Фалленианского дерева",
            type: "main",
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: "https://code.s3.yandex.net/react/code/sp_1.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
            id: "60d3b41abdacab0026a733d11",
            qty: 1
        }
        const previousState = {
            ...initialState,
            ingredients: [
                bun,
                optional,
                optional1
            ],
            burgerComponents: {
                bun,
                optional: [optional, optional1]
            }
        }
        expect(reducer(previousState, {
            type: types.REMOVE_COMPONENT,
            item: optional,
            index: 0
        })).toEqual({
            ...previousState,
            ingredients: [bun, { ...optional, qty: 0 }, optional1],
            burgerComponents: {
                bun: bun,
                optional: [{ ...optional1, id: optional1._id + "0" }]
            }
        })
    })
    it('remove bun', () => {
        const bun = {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            qty: 2
        }
        const optional = {
            _id: "60d3b41abdacab0026a733cb",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
            id: "60d3b41abdacab0026a733cb0",
            qty: 1
        }
        const previousState = {
            ...initialState,
            ingredients: [
                bun,
                optional
            ],
            burgerComponents: {
                bun,
                optional: [optional]
            }
        }
        expect(reducer(previousState, {
            type: types.REMOVE_COMPONENT,
            item: bun,
            index: 1
        })).toEqual({
            ...previousState,
            ingredients: [{ ...bun, qty: 0 }, optional],
            burgerComponents: {
                bun: null,
                optional: [optional]
            }
        })
    })
})