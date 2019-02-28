import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm : FormGroup;
  constructor(private fb :FormBuilder ) { }
  
  ngOnInit() {
    this.myForm = this.fb.group({
      email : ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password : ['',Validators.required],
      remember : ['true']
    });
      
  }
  
  onSubmit() : void
  {
    
    if(this.myForm.valid){
      console.log(this.myForm.value);
      alert("Welcome to ePharma");
      this.myForm.reset();

    }
    else{
      console.log("Sign-in fail");
    // this.markFormGroupTouched(this.myForm);
      console.log(this.myForm.value);
    }
    
  }
  
  // markFormGroupTouched(formGroup: FormGroup) {
  //   (Object as any).values(formGroup.controls).forEach(control => {
  //     control.markAsTouched();

  //     if (control.controls) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });
  // }

}
