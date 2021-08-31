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
    drag_id: number;
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