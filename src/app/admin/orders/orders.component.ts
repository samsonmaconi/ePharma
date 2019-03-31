import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  url : any;
  count: any;
  totalNumberOfPages: any;
  public showPagination = false;
  public paginationCount:any;
  public pagination = [];
  orderObjectValue = [];
  public data: any;
  orderId: string;
  public pageId: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getAllOrders();

  }


  getAllOrders() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.orderId = params['page'];
      if(!this.orderId){
        this.orderId = "1";
      }

      this.pageId = params['status'];
      if(!this.pageId){
        this.pageId = "4";
      }
      this.url = 'http://localhost:4200/api/admin/viewAllOrders/' + this.orderId + '/'+this.pageId;
      this.http.get(this.url, {responseType: 'json'}).subscribe(
        response => {
            this.data = response;
            this.getPaginationCount();
       });
    });
  }

  getPaginationCount() {
    if(this.pageId === "0" || this.pageId === "1"){
      this.url = 'http://localhost:4200/api/admin/getOrderCount/'+this.pageId;
    }else{
      this.url = 'http://localhost:4200/api/admin/getOrderCount/4';
    }
    this.http.get(this.url, {responseType: 'json'}).subscribe(
      response => {
          this.paginationCount = response;
          this.showPaginationCount();
          this.generateCountArray();
     });
  }

  showPaginationCount(){
    if ( this.paginationCount > 2 ) {
      this.showPagination = true;
     }
  }

  generateCountArray(){
    // console.log(Number(this.paginationCount) % 2);
    this.totalNumberOfPages = Number(this.paginationCount)/2;
    this.count = 0;
    while(this.count < Number(this.totalNumberOfPages)){
      this.pagination[this.count] = this.count;
      this.count= this.count + 1;
    }
  }


  itemsPage() {
    this.router.navigate(['admin/orderitems'],{queryParams:{orderId:this.orderId}});
  };

}
