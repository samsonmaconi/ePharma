import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthenticationInterceptor } from './services/authentication-interceptor';
import { ErrorInterceptor } from './services/error-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainComponent } from './main/main.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { CartComponent } from './cart/cart.component';
import { ChatComponent } from './chat/chat.component';

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
    MainComponent,
    CatalogComponent,
    ForgotPasswordComponent,
    ManageProfileComponent,
    CartComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlickityModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass:AuthenticationInterceptor, multi: true
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
