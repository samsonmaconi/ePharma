import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordMatchValidation } from '../register/password';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Iuser } from '../models/User.model';


@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  myform: FormGroup;
  private rsub;
  private id;
  private editString: string = "Edit";
  private temp: boolean = true;
  constructor(private fb: FormBuilder, private http: HttpClient, private authServcie: AuthService, private route: Router) { }

  ngOnInit() {
    this.myform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Add1: ['', Validators.required],
      Add2: ['', Validators.required],
      city: ['', Validators.required],
      pc: ['', Validators.required],
    });

    this.id = this.authServcie.getUserId();
    this.http.get('api/user/' + this.id).subscribe(response => {
      console.log(response);
      this.myform.patchValue({ firstName: response['firstName'] });
      this.myform.patchValue({ lastName: response['lastName'] });
      this.myform.patchValue({ email: response['email'] });
      this.myform.patchValue({ Add1: response['Address1'] });
      this.myform.patchValue({ Add2: response['Address2'] });
      this.myform.patchValue({ city: response['city'] });
      this.myform.patchValue({ pc: response['postalCode'] });

    });
  }
  onSubmit() {
    console.log("update called");
    this.userData(this.myform.value).subscribe(()=>{
      console.log("success");
      alert("updated");
    });
  }

  userData(data: any){
    console.log(data);
    const id = this.authServcie.getUserId();
    const user: Iuser ={
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      Address1: data.Add1,
      Address2: data.Add2,
      city: data.city,
      postalCode: data.pc
    };
    return this.http.put('/api/user/'+id,user);
  }
  onEdit() {

    if (this.temp) {
      this.editString = "Cancel";
    }
    else {
      this.editString = "Edit";
    }
    this.temp = !this.temp;
  }
}


