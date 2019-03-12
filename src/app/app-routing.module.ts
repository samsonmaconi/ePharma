import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadPrescriptionComponent} from './upload-prescription/upload-prescription.component';
import { ProductComponent } from './product/product.component';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: 'product/', component: CatalogComponent },
  { path: 'catalog/:category', component: CatalogComponent },
  { path: 'catalog/', component: CatalogComponent },
  { path : 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'upload-prescription', component : UploadPrescriptionComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
