import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  pushCartItemArray: any = [];
  productID: any;
  product;
  deleteValue = 0;
  public deletedID;
  private routerSub: any;
  public totalAmount: any = 0;
  public count: any = 0;
  public currentProductQuantity: any;


  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadProductsForCart();
  }

  loadProductsForCart() {
    this.routerSub = this.route.params.subscribe(async params => {
      var cartItems = JSON.parse(localStorage.getItem('cartProducts'));
      var cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
      if (cartItems) {
        let count = 0;
        for (let cartValues of cartItems) {
          this.productID = cartValues;
          this.currentProductQuantity = cartQuantity[count];
          console.log(this.product);
          count = count + 1;
          this.product = await this.http
            .get(this.data.productAPIURL + `/product?id=${this.productID}`)
            .toPromise();
          this.product = this.product[0];
          this.totalAmount = this.totalAmount + (this.product.product_price * this.currentProductQuantity);
          this.pushCartItemArray.push({ productId: this.product._id, productImage: this.product.product_image, productName: this.product.product_name, productPrice: this.product.product_price, productQuantity: this.currentProductQuantity, productAmount: this.product.product_price * this.currentProductQuantity })

        }
      }
    });
  }
  deleteRow(index, currentProudctId, currentProductAmount, currentProductQuantity) {
    console.log(currentProudctId, currentProductAmount, currentProductQuantity);
    console.log('itemvalue', this.data.numberOfItemsInCart);
    this.deletedID = currentProudctId;
    this.pushCartItemArray.splice(index, 1);
    var newItems = JSON.parse(localStorage.getItem('cartProducts'));
    var updatedItems = [];
    for (let items of newItems) {
      if (this.deletedID === items) {

      }
      else {
        updatedItems.push(items);
      }
    }
    this.data.numberOfItemsInCart = this.data.numberOfItemsInCart - currentProductQuantity;
    this.totalAmount = this.totalAmount - currentProductAmount;
    console.log("values", this.pushCartItemArray);
    console.log('updated array', updatedItems);
    localStorage.setItem('cartProducts', JSON.stringify(updatedItems));

  }

}
