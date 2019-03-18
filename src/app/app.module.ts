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
import { DemoCheckComponent } from './demo-check/demo-check.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SliderSingleComponent } from './slider-single/slider-single.component';
import { SliderMultiComponent } from './slider-multi/slider-multi.component';
import { ProductComponent } from './product/product.component';
import { MainComponent } from './main/main.component';

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
    DemoCheckComponent,
    SignupPageComponent,
    SliderSingleComponent,
    SliderMultiComponent,
    ProductComponent,
    MainComponent
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
