import { wsReducer as reducer, initialState } from './wsReducer';
import * as types from '../actions/wsActions';
import testOrders from '../../utils/orders-feed-test-data'

describe('wsReducer test', () => {
  it('WS_CONNECTION_SUCCESS', () => {
    expect(reducer(undefined, { type: types.WS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true,
      code: "",
      error: ""
    })
  })
  it('WS_GET_COMMON_ORDERS', () => {
    const resp = {
      "success": true,
      "orders": [
        {
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733ca",
          ],
          "_id": "123",
          "status": "inProgress",
          "number": "123",
          "createdAt": "2021-06-23T14:43:22.587Z",
          "updatedAt": "2021-06-23T14:43:22.603Z",
          "name": "qwerty"
        },
        {
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733ca",
            "60d3b41abdacab0026a733cb"
          ],
          "_id": "1234",
          "status": "inProgress",
          "number": "1234",
          "createdAt": "2021-06-23T14:43:22.587Z",
          "updatedAt": "2021-06-23T14:43:22.603Z",
          "name": "qwerty"
        },
        {
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733ca",
            "60d3b41abdacab0026a733cb"
          ],
          "_id": "1235",
          "status": "done",
          "number": "1235",
          "createdAt": "2021-06-23T14:43:22.587Z",
          "updatedAt": "2021-06-23T14:43:22.603Z",
          "name": "qwerty"
        },
        {
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733ca",
            "60d3b41abdacab0026a733cb"
          ],
          "_id": "123885",
          "status": "done",
          "number": "123885",
          "createdAt": "2021-06-23T14:43:22.587Z",
          "updatedAt": "2021-06-23T14:43:22.603Z",
          "name": "qwerty"
        }
      ],
      "total": 12,
      "totalToday": 228
    }
    expect(reducer(undefined, { type: types.WS_GET_COMMON_ORDERS, payload: resp })).toEqual({
      ...initialState,

      commonOrders: {
        orders: resp.orders,
        statistics: {
          total: resp.total,
          totalToday: resp.totalToday,
          readyOrders: ["1235"],
          inProgressOrders: ["123", "1234"]
        }
      }
    })
  })
})