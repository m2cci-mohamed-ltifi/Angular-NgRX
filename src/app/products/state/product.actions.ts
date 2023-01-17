import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleMaskUserAction=createAction('[Product] Toggle Product Code');
export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{product:Product}>()
    );

export const clearCurrentProduct=createAction('[Product] Clear Current Product');

export const initializeCurrentProduct=createAction('[Product] Initialize Current Product');

export const loadProducts = createAction('[Product] Load');

export const loadProductSuccess = createAction('[Product] Loaded Data With Success',props<{products:Product[]}>());

export const LoadProductFailure = createAction('[Product] Failed To Load Data',props<{errorMessage:string}>());