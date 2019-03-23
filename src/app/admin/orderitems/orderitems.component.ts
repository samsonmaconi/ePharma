import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-orderitems',
  templateUrl: './orderitems.component.html',
  styleUrls: ['./orderitems.component.scss']
})


export class OrderitemsComponent implements OnInit {

  selectedValue: string = '';
  orderId: string;
  public data: any;
  userId: any;
  getUrl: any;
  Object = Object;
  public jsonData: any;
  public orderStatus = ['Pending', 'Processing', 'Shipped/Completed'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadOrderItem();
  }

  loadOrderItem() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['orderId'];
      this.loadOrderItemDetails();
    });
  }

  loadOrderItemDetails(){
    this.getUrl = 'http://localhost:4200/api/admin/viewOrders/' + this.userId;
    this.http.get(this.getUrl, {responseType: 'json'}).subscribe(
      response => {
          this.data = response;
          this.jsonData=Object.keys(this.data.items);
     });
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedValue = event.target.value;
    console.log(this.selectedValue);
  }

}
