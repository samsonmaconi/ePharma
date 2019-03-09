import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  Products;
  productName: string;
  productDescription: string;
  productPrice: string;
  productCompany: string;
  productCategory: string;
  productRating: number;
  productImage: string;

  private routerSub: any;
  private productsSub: any;
  productID: number;



  constructor(private data: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.routerSub = this.route.params.subscribe(params => {
      this.productID = +params.productId; // (+) converts string 'id' to a number

      this.productsSub = this.data.productsData.subscribe(prodData => {
        this.Products = prodData;
        this.productName = this.Products[this.productID].product_name;
        this.productCompany = this.Products[this.productID].product_company;
        this.productCategory = this.Products[this.productID].product_category;
        this.productDescription = this.Products[this.productID].product_description;
        this.productRating = this.Products[this.productID].product_rating;
        this.productImage = this.Products[this.productID].product_image;
        this.productPrice = this.Products[this.productID].product_price;
        console.log('Products loaded');
      });

    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.productsSub.unsubscribe();
  }

  addToCart() {}
}
