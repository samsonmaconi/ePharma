import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { PasswordMatchValidation } from './password';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  myform: FormGroup;
  private authStatusSub: Subscription;
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe();

// Front end Validations
    this.myform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      Add1: ['', Validators.required],
      Add2: ['', Validators.required],
      city: ['', Validators.required],
      pc: ['', Validators.required],
    },
      {
        validators: PasswordMatchValidation.pwdmatch

      });
      if(this.authService.getIsAuth()){
        return this.router.navigate(['/']);
      }
  }
  onSubmit() {

    if (this.myform.invalid) {
      return;

    }
// Method to create user
    this.authService.createUser(this.myform.value.firstName,
      this.myform.value.lastName,
      this.myform.value.email,
      this.myform.value.password,
      this.myform.value.confirmPassword,
      this.myform.value.Add1,
      this.myform.value.Add2,
      this.myform.value.city,
      this.myform.value.pc);

    this.myform.reset();

  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}
