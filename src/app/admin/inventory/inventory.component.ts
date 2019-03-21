import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public product: any;

  constructor( private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.http.get('http://localhost:4200/api/admin/products', {responseType: 'json'}).subscribe(
      response => {
          console.log('product:' + response);
          this.product = response;
     });
  }


}
