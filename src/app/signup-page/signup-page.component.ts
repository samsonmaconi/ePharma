import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { PasswordMatchValidation } from './password-match';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  fileToUpload: File= null;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  ngOnInit() {

   
    window.scrollTo(0, 0);

    this.signupForm = this.fb.group({
      name: ['', Validators.required],      
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phoneNumber: ['', Validators.required],
      //gender: ['', Validators.required],
      //password: ['', [Validators.required, Validators.minLength(8)]],
      //confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Signup Submitted Sucessfully');
      console.log(this.signupForm.value);
      alert('Registration Successful');
      this.signupForm.reset();
      this.router.navigate(['/']);
    } else {
      console.log('Signup Submision Failed');
      this.markFormGroupTouched(this.signupForm);
      console.log(this.signupForm.value);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}