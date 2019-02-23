import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadPrescriptionComponent } from './upload-prescription/upload-prescription.component';

const routes: Routes = [
  {
     path: '', component: HomeComponent 
    },
    {
      path : 'upload-prescription', component : UploadPrescriptionComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
