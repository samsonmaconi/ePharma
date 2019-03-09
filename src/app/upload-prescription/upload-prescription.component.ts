import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload-prescription.component.html',
  styleUrls: ['./upload-prescription.component.scss']
})
export class UploadPrescriptionComponent implements OnInit {

  fileToUpload: File = null;
  prescriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  ngOnInit() {


    window.scrollTo(0, 0);

    this.prescriptionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.prescriptionForm.valid) {
      console.log('Signup Submitted Sucessfully');
      console.log(this.prescriptionForm.value);
      alert('Registration Successful');
      this.prescriptionForm.reset();
      this.router.navigate(['/']);
    } else {
      console.log('Signup Submision Failed');
      this.markFormGroupTouched(this.prescriptionForm);
      console.log(this.prescriptionForm.value);
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
