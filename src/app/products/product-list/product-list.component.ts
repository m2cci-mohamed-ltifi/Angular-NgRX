import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import * as ProductActions from '../state/product.actions';
import { getCurrentProduct, getProducts, getShowProductCode, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;

  constructor(private store:Store<State>) { }

  ngOnInit(): void {

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductActions.loadProducts())

    this.displayCode$=this.store.select(getShowProductCode);
  }

  ngOnDestroy(): void {
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleMaskUserAction());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({product}));
  }

}
