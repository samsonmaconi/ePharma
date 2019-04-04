import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  myform: FormGroup;
  constructor(private fb: FormBuilder,
    private http:HttpClient,
    private route: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.myform = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
  }

  onSubmit(content){
    console.log(this.myform.get('email').value);
    this.getEmail(this.myform.get('email').value).subscribe(res=>{
      console.log(res);
    });
    this.modalService.open(content, { centered: true });
    this.myform.reset();


  }
  getEmail(email:string){
    return this.http.post('/api/user/forgot/'+ email,email);
  }
}

