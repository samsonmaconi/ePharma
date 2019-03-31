import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  pushCartItemArray: any = [];
  productID: any;
  product;
  private routerSub: any;
  public totalAmount: any = 0;


  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadProductsForCart();
  }

  loadProductsForCart(){
    this.routerSub = this.route.params.subscribe(async params => {
    var cartItems = JSON.parse(localStorage.getItem('cartProducts'));
    var cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
    if(cartItems){
      let count = 0;
      for(let cartValues of cartItems) {
        this.productID = cartValues;
        // this.selectedQuantity =  '1';
        let currentProductQuantity= cartQuantity[count];

        count = count +1;
        this.product = await this.http
        .get(this.data.productAPIURL + `/product?id=${this.productID}`)
        .toPromise();
        this.product = this.product[0];
        // tslint:disable-next-line:max-line-length
        this.totalAmount = this.totalAmount + (this.product.product_price * currentProductQuantity);
        this.pushCartItemArray.push({productImage: this.product.product_image, productName: this.product.product_name, productPrice: this.product.product_price, productQuantity: currentProductQuantity, productAmount: this.product.product_price * currentProductQuantity})

      }
      console.log(this.totalAmount);
    }
  });
  }

}
