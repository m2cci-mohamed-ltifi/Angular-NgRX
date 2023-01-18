import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AppState from '../../state/app.state';

import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
  products: ProductState;
}
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error:''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

const getError = createSelector(getProductFeatureState, state => state.error)

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getcurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getcurrentProduct,
  (state, currentProduct) =>
    state.products.find((p) => p.id === currentProduct.id)
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleMaskUserAction, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action):ProductState => {
    return {
      ...state,
      currentProduct: action.product,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState=> {
    return {...state,
        currentProduct:null
    }
  }),
  on(ProductActions.initializeCurrentProduct,(state) : ProductState=>{
    return {...state,currentProduct: {
        id:0,
        productName:'',
        productCode:'New',
        description: '',
        starRating:0
    }}
  }),
  on(ProductActions.loadProductSuccess,(state,action):ProductState =>{
    return {
        ...state, 
        products:action.products
    }
  }),
  on(ProductActions.LoadProductFailure,(state,action)=> {
    return {...state,error:action.errorMessage}
  })
);
