import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public product: any;
  productName: string;
  closeResult: string;


  constructor( private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadData();

  }
  loadData() {
    this.http.get('/api/admin/products', {responseType: 'json'}).subscribe(
      response => {
          console.log('product:' + response);
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

  save(content) {
    this.http.put('/api/admin/products/', {responseType: 'json'}).subscribe(
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
