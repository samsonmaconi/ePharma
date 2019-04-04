import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  count: any;
  public users: any;
  totalNumberOfPages: any;
  public showPagination = false;
  public paginationCount: any;
  public pageId: any;
  public pagination = [];
  URL = '/api/admin/users/';
  countUrl: any;
  constructor(private http: HttpClient,  private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loadData();
  }

    loadData() {
      this.activatedRoute.queryParams.subscribe(params => {
      this.pageId = params['page'];
      console.log(this.pageId);
      this.URL = 'http://localhost:4200/api/admin/users/' + this.pageId;
      this.http.get(this.URL, {responseType: 'json'}).subscribe(
        response => {
            this.users = response;
            this.getPaginationCount();
       });
    });
  }

    delete(id) {
      if (window.confirm('Do you really want to delete this item?'))
      {
        console.log('Inside confirm');
        this.http.delete(this.URL + `${id}`).subscribe((res) => {
          alert('Updated successfully');
        });
      }
      else
      {
        // Do nothing
      }
    }

    getPaginationCount() {
      this.countUrl= 'http://localhost:4200/api/admin/getUserCount/';
      this.http.get(this.countUrl, {responseType: 'json'}).subscribe(
        response => {
            this.paginationCount = response;
            console.log(this.paginationCount);
            this.showPaginationCount();
            this.generateCountArray();
            this.showUsers();
       });
    }
  showUsers(): any {
    console.log(this.URL);
    this.http.get(this.URL, {responseType: 'json'}).subscribe(
      response => {
          this.users = response;
     });
  }

    showPaginationCount() {
      if ( this.paginationCount > 2 ) {
        this.showPagination = true;
       }
    }
    generateCountArray(){
      // console.log(Number(this.paginationCount) % 2);
      this.totalNumberOfPages = Number(this.paginationCount) / 5;
      this.count = 0;
      while (this.count < Number(this.totalNumberOfPages)) {
        this.pagination[this.count] = this.count;
        this.count = this.count + 1;
      }
    }
}
