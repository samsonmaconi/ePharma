import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Status has been updated and mail has been sent to the user',
}];

@Component({
  selector: 'app-orderitems',
  templateUrl: './orderitems.component.html',
  styleUrls: ['./orderitems.component.scss']
})


export class OrderitemsComponent implements OnInit {

  public showMyMessage = false;
  alerts: Alert[];
  selectedValue: string = '';
  public data: any;
  orderId: any;
  getUrl: any;
  Object = Object;
  itemId: string;
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
      this.orderId = params['orderId'];
      this.loadOrderItemDetails();
    });
  }

  loadOrderItemDetails(){
    this.getUrl = 'http://localhost:4200/api/admin/viewOrders/' + this.orderId;
    this.http.get(this.getUrl, {responseType: 'json'}).subscribe(
      response => {
          this.data = response;

          this.jsonData=Object.keys(this.data.items);
     });
  }

  selectChangeHandler(event: any) {
    this.itemId = event.target.options[event.target.options.selectedIndex].id;
    this.selectedValue = event.target.value;
    this.getUrl = '/api/admin/UpdateOrders/' + this.orderId + '/' + this.itemId + '/' + this.selectedValue;
    this.http.put(this.getUrl, {responseType: 'json'}).subscribe(
      response => {
          if(response == 1){
            this.showMyMessage = true;
          }else{

          }
     });
  }

}
