import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadPrescriptionComponent } from './upload-prescription/upload-prescription.component';
import { ProductComponent } from './product/product.component';
<<<<<<< HEAD
import { CatalogComponent } from './catalog/catalog.component';
import { MainComponent } from './main/main.component';

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
      { path : 'login', component: LoginComponent },
      { path : 'register', component: RegisterComponent },
      { path : 'upload-prescription', component : UploadPrescriptionComponent }
    ]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  }
=======
import { AuthGuard } from './services/auth-guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload-prescription', component: UploadPrescriptionComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
>>>>>>> feature_login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
