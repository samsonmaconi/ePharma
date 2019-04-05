import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  message: string = 'updateCartValue';
  @Output() messageEvent = new EventEmitter<string>();

  public showMyMessage = false;
  public showUpdateMessage = false;
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
  selectedQuantity = '1';
  starRating = 0;
  totalQuantity = 0;


  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
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
    this.data.numberOfItemsInCart =this.totalNumberOfItems();
    this.routerSub = this.route.params.subscribe(async params => {
      this.productID = params.productId;
      this.selectedQuantity =  '1';

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

    addToCart() {
    this.messageEvent.emit(this.message);
    var cartItems = JSON.parse(localStorage.getItem('cartProducts'));
    if(!cartItems){
      const cartItem = [this.productID];
      const cartQty = [this.selectedQuantity];
      localStorage.setItem('cartProducts', JSON.stringify(cartItem));
      localStorage.setItem('cartQuantity', JSON.stringify(cartQty));
      this.showMyMessage = true;
    }else{
      this.showUpdateMessage = true;
      let found =0;
      let cartItemIndex = 0;
      for(let cartValues of cartItems) {
        if(cartValues === this.productID){
          found =1;
          break;
        }
        cartItemIndex = cartItemIndex + 1;
     }

      if(found){
        const productCartIndex = cartItemIndex;
        console.log(productCartIndex);
        let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
        cartQuantity[productCartIndex] = this.selectedQuantity;
        console.log(cartQuantity);
        localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    } else{
      var cartItems = JSON.parse(localStorage.getItem('cartProducts'));
      let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));

      cartItems.push(this.productID);
      cartQuantity.push(this.selectedQuantity);

      localStorage.setItem('cartProducts', JSON.stringify(cartItems));
      localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

      this.data.numberOfItemsInCart =this.totalNumberOfItems();
    }
      // test.append(this.productID);
    }
    // const value = ["aa","bb","cc"];
    // localStorage.setItem("testKey", JSON.stringify(value));

    // alert(test);
  }
  totalNumberOfItems(){
    let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
    if(cartQuantity) {
      for(let cartValues in cartQuantity){
        this.totalQuantity = this.totalQuantity + parseInt(cartValues);
      }
      return this.totalQuantity;
    }
    return 0;
  }
}
