import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';

import { Product } from "../product";

export interface State extends AppState.State {
    products: ProductState;
}
export interface ProductState{
    showProductCode:boolean;
    currentProductId:number;
    products:Product[];
}

const initialState:ProductState = {
    showProductCode:true,
    currentProductId:null,
    products:[]
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
)

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
)
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state,currentProductId) => state.products.find(p=>p.id===currentProductId)
)

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
)

export const productReducer = createReducer<ProductState>(
    initialState, on(createAction('[product] Toggle Product Code'), (state):ProductState=>{
        console.log('original state: '+JSON.stringify(state));
        return {
            ...state,
            showProductCode:!state.showProductCode
        };
    })
);