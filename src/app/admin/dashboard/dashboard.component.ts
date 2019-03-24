import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public data: any ;
  public pendingOrders: any;
  public pendingOrderCount: any;
  public completedOrderCount: any;
  public totalReveueGenerated: any;
  private routerSub: any;
  productID: string;
  starRating = 0;

  constructor(
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
    console.log('inside ngOnInit');
    this.checkConnection();
  }

  checkConnection() {
    this.http.get('/api/admin/viewOrders/', {responseType: 'json'}).subscribe(
      response => {
          console.log('data :' + response);
          this.data = response;
          // let sample = JSON.stringify(response);
          this.calculatePendingOrders();
          console.log(response);
     });
  }

  calculatePendingOrders() {
    let countPendingOrders = 0;
    let completedOrders = 0;
    let revenueGenerated = 0;
    console.log('Inside pending orders');
    for ( let results of this.data) {
      revenueGenerated = revenueGenerated + results.total_cost;
      if ( results.order_status === 0) {
          countPendingOrders  = countPendingOrders + 1;
      }else{
        completedOrders = completedOrders + 1;
      }
    }
    this.completedOrderCount = completedOrders;
    this.pendingOrderCount = countPendingOrders;
    this.totalReveueGenerated = revenueGenerated;
  }

  ngOnDestroy() {
    // this.routerSub.unsubscribe();
  }


}
