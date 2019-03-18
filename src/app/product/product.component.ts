import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product;
  productName: string;
  productDescription: string;
  productPrice: string;
  productCompany: string;
  productCategory: string;
  productRating: number;
  productImage: string;

  private routerSub: any;
  productID: string;
  starRating = 0;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.router.events.subscribe(() =>
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    );

    this.loadProduct();
  }

  loadProduct() {
    this.routerSub = this.route.params.subscribe(async params => {
      this.productID = params.productId;

      this.product = await this.http
        .get(this.data.productAPIURL + `/product?id=${this.productID}`)
        .toPromise();

      this.product = this.product[0];
      this.productName = this.product.product_name;
      this.productCompany = this.product.product_company;
      this.productCategory = this.product.product_category;
      this.productDescription = this.product.product_description;
      this.productRating = this.product.product_rating;
      this.productImage = this.product.product_image;
      this.productPrice = this.product.product_price;
      console.log('Product loaded');

      this.productDescription =
        this.productDescription[0].toUpperCase() +
        this.productDescription.substr(1);

      this.starRating = Math.round(this.productRating / 2);
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  addToCart() {}
}
