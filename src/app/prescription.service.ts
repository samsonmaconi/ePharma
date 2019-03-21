import { Injectable } from '@angular/core';
import { IPrescription } from './prescription.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PrescriptionService {

  constructor(private http: HttpClient) {}

  createPrescription( orderNumber: number, name: string, email: string, phoneNumber: number, imagePath: string) {
    const prescriptionData: IPrescription = { orderNumber, name, email, phoneNumber, imagePath };
    // const presData = new FormData();
    // presData.append('orderNumber', String(orderNumber));
    // presData.append('name', name);
    // presData.append('email', email);
    // presData.append('phoneNumber', String(phoneNumber));
    // presData.append('image', image, name);
    this.http.post('http://localhost:1234/api/prescription', prescriptionData)
      .subscribe(response => {
        console.log(response);
      });
  }
}



