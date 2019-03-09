import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { ReactiveFormsModule} from '@angular/forms';
=======
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlickityModule } from 'ngx-flickity';
>>>>>>> home

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavCategoryComponent } from './nav-category/nav-category.component';
import { NavComponent } from './nav/nav.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { DemoCheckComponent } from './demo-check/demo-check.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
=======
import { SliderSingleComponent } from './slider-single/slider-single.component';
import { SliderMultiComponent } from './slider-multi/slider-multi.component';
import { ProductComponent } from './product/product.component';
>>>>>>> home

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavCategoryComponent,
    NavComponent,
<<<<<<< HEAD

    LoginComponent,
    RegisterComponent,

    
    DemoCheckComponent,
    
    SignupPageComponent

=======
    SliderSingleComponent,
    SliderMultiComponent,
    ProductComponent
>>>>>>> home
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    
=======
    HttpClientModule,
    FlickityModule
>>>>>>> home
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
