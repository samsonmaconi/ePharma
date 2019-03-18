import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlickityModule } from 'ngx-flickity';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavCategoryComponent } from './nav-category/nav-category.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadPrescriptionComponent} from './upload-prescription/upload-prescription.component';
import { SliderSingleComponent } from './slider-single/slider-single.component';
import { SliderMultiComponent } from './slider-multi/slider-multi.component';
import { ProductComponent } from './product/product.component';
<<<<<<< HEAD
import { MainComponent } from './main/main.component';
=======
import { CatalogComponent } from './catalog/catalog.component';
>>>>>>> f41a4bb40271d4174ce4ae4e0e6d43acb5a4b1cf

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavCategoryComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    UploadPrescriptionComponent,
    SliderSingleComponent,
    SliderMultiComponent,
    ProductComponent,
<<<<<<< HEAD
    MainComponent
=======
    CatalogComponent
>>>>>>> f41a4bb40271d4174ce4ae4e0e6d43acb5a4b1cf
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlickityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
