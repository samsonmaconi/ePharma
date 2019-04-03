import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public users: any;
  URL = '/api/admin/users/';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

    loadData() {
      this.http.get('/api/admin/users', {responseType: 'json'}).subscribe(
        response => {
            this.users = response;
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
}
