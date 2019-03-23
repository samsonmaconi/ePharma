import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadPrescriptionComponent } from './upload-prescription/upload-prescription.component';
import { ProductComponent } from './product/product.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './services/auth-guard';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'product', component: CatalogComponent },
      { path: 'catalog/:category', component: CatalogComponent },
      { path: 'catalog/:category/:querystring', component: CatalogComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'upload-prescription', component: UploadPrescriptionComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'manage-profile', component: ManageProfileComponent }
    ]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
