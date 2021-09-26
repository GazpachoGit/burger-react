export type TIngredient = {
    readonly _id: string,
    readonly name: string,
    readonly type: string,
    readonly proteins: number,
    readonly fat: number,
    readonly carbohydrates: number,
    readonly calories: number,
    readonly price: number,
    readonly image: string,
    readonly image_mobile: string,
    readonly image_large: string,
    id?: string,
    qty?: number
}

export type TCreatedOrder = {
    readonly name: string,
    readonly order: {
        readonly number: number
    },
    readonly success: boolean
}
export type TOrder = {
    readonly ingredients: Array<string>,
    readonly _id: string,
    readonly status: string,
    readonly number: string,
    readonly createdAt: string,
    readonly updatedAt: string
}
export type TUser = {
    readonly email: string,
    readonly name: string
}
export type TTab = {
    id: string,
    title: string,
    ratio: number
}
export type TWsOrdersResponse = {
    success: boolean,
    orders: Array<TOrder>,
    total: number,
    totalToday: number
}
export type TForm = {
    [key: string]: string | boolean | number
}