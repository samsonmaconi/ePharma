import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  productAPIURL = '/api/products'; // api for accessing product items
  featuredItems;
  productCategories;
  featuredItemsRating = [8, 10]; // [min, max]
  numberOfItemsInCart =0;

  constructor(private http: HttpClient) {
    this.setFeaturedItems();
    this.setProductCategories();
  }

  private setFeaturedItems() {
    this.featuredItems = this.http.get(
      this.productAPIURL +
        `/featured?minrating=${this.featuredItemsRating[0]}&maxrating=${
          this.featuredItemsRating[1]
        }`
    );
  }

  getFeaturedItems() {
    return this.featuredItems;
  }
  loadProductsData() {
    return this.http.get(this.productAPIURL);
  }
  private setProductCategories() {
    this.productCategories = this.http.get(this.productAPIURL + `/category`);
  }

  getProductCategories() {
    return this.productCategories;
  }
}
