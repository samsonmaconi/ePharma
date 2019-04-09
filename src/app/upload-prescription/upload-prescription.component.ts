import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { prepareProfile } from 'selenium-webdriver/firefox';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload-prescription.component.html',
  styleUrls: ['./upload-prescription.component.scss']
})
export class UploadPrescriptionComponent implements OnInit {
  fileToUpload: File = null;
  prescriptionForm: FormGroup;
  imagePreview: string;
  private id:string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private route: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.prescriptionForm = this.fb.group({
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
      image: ['', Validators.required]
    });
    this.id = this.authService.getUserId();
    console.log('id',this.id);
    this.http.get('api/user/' + this.id).subscribe(response => {
      console.log(response);
      this.prescriptionForm.patchValue({ name: response['firstName'] });
      this.prescriptionForm.patchValue({ email: response['email'] });
    });
  }

  onSubmit(content): void {
    if (this.prescriptionForm.valid) {
      console.log(this.prescriptionForm.value);

      const data = new FormData();

      data.append('name', this.prescriptionForm.value.name);
      data.append('email', this.prescriptionForm.value.email);

      data.append('image', this.fileToUpload);

      this.prescriptionForm.reset();
      this.imagePreview = '';
      this.http.post('/api/prescription', data)
      .subscribe(response => {
        console.log(response);
      });
      this.modalService.open(content, { centered: true });

    } else {
      console.log('Prescription Submision Failed');
      this.markFormGroupTouched(this.prescriptionForm);
      console.log('samarth' + this.prescriptionForm.value);
    }

  }

  onFileChanged(e) {
    this.fileToUpload = e.target.files[0];
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
