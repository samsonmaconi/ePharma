import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // dataAPIURL = 'https://my.api.mockaroo.com/epharma.json?key=3a972810&count=100'; // sample products dataset
  dataAPIURL = '../assets/test_data/epharma.json'; // sample products dataset
  productsData;

  constructor(private http: HttpClient) {
    this.productsData = this.loadProductsData();

    // Logs sample dataset to console when it's loaded for debugging
    this.getProductsData().subscribe(
      data => {
        console.log('"The data:"');
        console.log(data);
      },
      error => console.error('There was an error retrieving the data', error),
      () => console.log('Product Data retrieved!')
    );
  }

  loadProductsData() {
    return this.http.get(this.dataAPIURL);
  }

  getProductsData() {
    return this.productsData;
  }

}
