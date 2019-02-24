import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { DemoCheckComponent } from './demo-check/demo-check.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  {
     path: '', component: HomeComponent 
    },
   {
      path : 'demo-check', component : DemoCheckComponent
    },     
    {
      path : 'signup-page', component : SignupPageComponent 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
