export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
}

export type TIngredientConstructor = TIngredient & {
    drag_id: string;
}

export type TMovingIngredient = {
    dragIndex: number;
    hoverIndex: number;
}

export type TModalInner = {
    title: null | string;
    type: "ingredientDetails" | "orderDetails" | "orderInfo"
}

export type TOrder = {
    readonly createdAt: string
    readonly ingredients: ReadonlyArray<string>
    readonly name: string
    readonly number: number
    readonly status: "done" | "pending" | "created";
    readonly updatedAt: string
    readonly _id: string
}

export type TOrderInfo = {
    ingredientsArr: ReadonlyArray<TIngredient>;
    order: TOrder
}

export type TMessageResetPassword = {
    readonly message: string;
    readonly success: boolean;
}

export type TPasswordReset = {
    readonly password: string
    readonly token: string
}

export type TMessageResetEmail = {
    readonly message: string;
    readonly success: boolean;
}

export type TUserInfo = {
    readonly accessToken: string
    readonly refreshToken: string
    readonly success: boolean
    readonly user: TUser
    readonly email: string
    readonly name: string
}

export type TUser = {
    readonly email: string
    readonly name: string
}

export type TWsOrders = {
    success: true,
    orders: Array<TOrder>,
    total: number;
    totalToday: number;
}
