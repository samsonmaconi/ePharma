import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderObjectValue = [];
  public data: any;
  orderId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getAllOrders();
  }


  getAllOrders() {
    this.http.get('http://localhost:4200/api/admin/viewOrders', {responseType: 'json'}).subscribe(
      response => {
          this.data = response;
     });
  }

  itemsPage() {
    this.router.navigate(['admin/orderitems'],{queryParams:{orderId:this.orderId}});
  };

}
