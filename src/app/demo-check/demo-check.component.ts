import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-demo-check',
  templateUrl: './demo-check.component.html',
  styleUrls: ['./demo-check.component.scss']
})
export class DemoCheckComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', Validators.required],
      remember: ['true']
    });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      console.log('Signin Sucessful');
      console.log(this.signinForm.value);
      alert('Signin Successful');
      this.signinForm.reset();
      this.router.navigate(['/']);
    } else {
      console.log('Signin Failed');
      this.markFormGroupTouched(this.signinForm);
      console.log(this.signinForm.value);
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
