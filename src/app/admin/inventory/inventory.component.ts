import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public product: any;
  prod_id: any;
  product_name: string;
  product_description:string;
  prsod: Product;
  closeResult: string;
  URL = '/api/admin/products/';

  constructor( private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadData();

  }
  // By default load the page with data
  loadData() {
    this.http.get('/api/admin/products', {responseType: 'json'}).subscribe(
      response => {
          this.product = response;
     });
  }
// Display modal form on clicking the edit button
  edit(editContent) {
    this.modalService.open(editContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // Handling edit form functionality
  onSubmit(productForm: NgForm) {
    this.prod_id = JSON.stringify(productForm.value._id);
    this.putProduct(productForm.value).subscribe((res) => {
      alert('Updated successfully');
    });
  }
   putProduct(prod: any) {
     const product: Product = {
       _id : prod._id,
       product_name: prod.product_name,
       product_description: prod.product_description,
       product_company: prod.product_company,
       product_price: prod.product_price,
       product_image: prod.product_image,
       product_category: prod.product_category,
       product_rating: prod.product_rating,
       product_quantity: prod.product_quantity
     };
     return this.http.put(this.URL + `${product._id}`, prod);
  }
// Delete entry
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

  deleteProduct(prod: any) {
    const product: Product = {
      _id : prod._id,
      product_name: prod.product_name,
      product_description: prod.product_description,
      product_company: prod.product_company,
      product_price: prod.product_price,
      product_image: prod.product_image,
      product_category: prod.product_category,
      product_rating: prod.product_rating,
      product_quantity: prod.product_quantity
    };
    return this.http.delete(this.URL + `${product._id}`, prod);
 }
 // Add product to DB
  add(addContent) {
    this.modalService.open(addContent, {ariaLabelledBy: 'modal-basic-title-add'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // Handling add form functionality
  onAddSubmit(addProductForm: NgForm) {
    this.prod_id = JSON.stringify(addProductForm.value._id);
    this.addProduct(addProductForm.value).subscribe((res) => {
      alert('Added successfully');
    });
  }
   addProduct(prod: any) {
     return this.http.post(this.URL, prod);
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
