import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { prepareProfile } from 'selenium-webdriver/firefox';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload-prescription.component.html',
  styleUrls: ['./upload-prescription.component.scss']
})
export class UploadPrescriptionComponent implements OnInit {
  fileToUpload: File = null;
  prescriptionForm: FormGroup;
  imagePreview: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.prescriptionForm = this.fb.group({
      orderNumber: ['',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]
    ],
      name: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{2,30}$')
      ]
    ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]
      ],
      phoneNumber: ['',
            [
        Validators.required,
        Validators.pattern('^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$')
      ]
    ],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.prescriptionForm.valid) {
      console.log(this.prescriptionForm.value);
      alert('Prescription Successful');

      const data = new FormData();
      data.append('orderNumber', this.prescriptionForm.value.orderNumber);
      data.append('name', this.prescriptionForm.value.name);
      data.append('email', this.prescriptionForm.value.email);
      data.append('phoneNumber', this.prescriptionForm.value.phoneNumber);
      data.append('image', this.fileToUpload);

      this.prescriptionForm.reset();
      this.imagePreview = '';
      this.http.post('/api/prescription', data)
      .subscribe(response => {
        console.log(response);
      });

    } else {
      console.log('Prescription Submision Failed');
      this.markFormGroupTouched(this.prescriptionForm);
      console.log('samarth' + this.prescriptionForm.value);
    }

  }

  onFileChanged(e) {
    this.fileToUpload = e.target.files[0];
    if (this.fileToUpload) {
      console.log('File is not selected');
    }
    console.log(this.fileToUpload);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.fileToUpload);

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
