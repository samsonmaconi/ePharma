import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PrescriptionService } from '../prescription.service';
import { prepareProfile } from 'selenium-webdriver/firefox';
import { HttpClient } from '@angular/common/http';
import { IPrescription } from '../prescription.model';

@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload-prescription.component.html',
  styleUrls: ['./upload-prescription.component.scss']
})
export class UploadPrescriptionComponent implements OnInit {
  fileToUpload: File = null;
  prescriptionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private prescriptionService: PrescriptionService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.prescriptionForm = this.fb.group({
      orderNumber: [''],
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]
      ],
      phoneNumber: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.prescriptionForm.valid) {
      console.log('Signup Submitted Sucessfully');
      console.log(this.prescriptionForm.value);
      alert('Registration Successful');
      // this.prescriptionForm.reset();
      // this.router.navigate(['/']);

      const data = new FormData();
      data.append('orderNumber', this.prescriptionForm.value.orderNumber);
      data.append('name', this.prescriptionForm.value.name);
      data.append('email', this.prescriptionForm.value.email);
      data.append('phoneNumber', this.prescriptionForm.value.phoneNumber);
      data.append('image', this.fileToUpload);


      // const prescriptionData: IPrescription = {
      //   orderNumber: this.prescriptionForm.value.orderNumber,
      //   name: this.prescriptionForm.value.name,
      //   email: this.prescriptionForm.value.email,
      //   phoneNumber: this.prescriptionForm.value.phoneNumber,
      //   imagePath: this.prescriptionForm.value.image };

      this.http.post('/api/prescription', data)
      .subscribe(response => {
        console.log(response);
      });

    } else {
      console.log('Signup Submision Failed');
      this.markFormGroupTouched(this.prescriptionForm);
      console.log(this.prescriptionForm.value);
    }

  }

  onFileChanged(e) {
    this.fileToUpload = e.target.files[0];
    console.log(this.fileToUpload);
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
