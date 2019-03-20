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
    this.http.get('https://api.myjson.com/bins/10xt9u', {responseType: 'json'}).subscribe(
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
    console.log('Inside pending orders');
    for ( let results of this.data) {
      if ( results.order_status === 0) {
          countPendingOrders  = countPendingOrders + 1;
      }
    }
    this.pendingOrderCount = countPendingOrders;
  }

  ngOnDestroy() {
    // this.routerSub.unsubscribe();
  }


}
