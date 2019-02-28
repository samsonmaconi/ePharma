import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {PasswordMatchValidation} from './password';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  myform:FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myform = this.fb.group({
      firstName : ['', Validators.required],
      lastName :['',Validators.required],
      email : ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password : ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword : ['',Validators.required],
      Add1 : ['',Validators.required],
      Add2 : ['',Validators.required],
      city : ['',Validators.required],
      pc : ['',[Validators.required,Validators.pattern('^[+++-+++]$') ]],
    },
    {
      validators: PasswordMatchValidation.pwdmatch
      
    });
  }
  onSubmit() : void
  {
    
    if(this.myform.valid){
      console.log(this.myform.value);
      alert("Welcome to ePharma");
      this.myform.reset();

    }
    else{
      console.log("Sign-in fail");
      console.log(this.myform.value);
    }
    
  }
  
  
}
