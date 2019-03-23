import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public product: any;
  prod_id: any;
  productName: string;
  productDescription:string;
  closeResult: string;
  URL = '/api/admin/products/';

  constructor( private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadData();

  }
  loadData() {
    this.http.get('/api/admin/products', {responseType: 'json'}).subscribe(
      response => {
          this.product = response;
     });
  }

  edit(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit(productForm: NgForm) {
    this.prod_id = JSON.stringify(productForm.value._id);
    alert(this.prod_id);
    console.log(productForm.value.productName);
    console.log(productForm.value.productDescription);
    this.http.put(this.URL + productForm.value._id, {responseType: 'json'}).subscribe(
      response => {
          console.log('product:' + response);
          this.product = response;
     });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
