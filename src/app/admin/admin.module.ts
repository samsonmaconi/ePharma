import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
=======
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

>>>>>>> d0b05626666364964889c0771898d49eea9ac9a4
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AdminnavbarComponent } from './adminnavbar/adminnavbar.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { OrderitemsComponent } from './orderitems/orderitems.component';


@NgModule({

  imports: [
    CommonModule,
    AdminRoutingModule,
<<<<<<< HEAD
    NgbModule
=======
    FormsModule,
    ReactiveFormsModule
>>>>>>> d0b05626666364964889c0771898d49eea9ac9a4
  ],
  bootstrap: [AdminMainComponent],

  declarations: [ DashboardComponent, AdminMainComponent, SidebarComponent, UserComponent, OrdersComponent, InventoryComponent, AdminnavbarComponent, AdminloginComponent, OrderitemsComponent]

})
export class AdminModule { }
