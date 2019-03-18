import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'order', component: OrdersComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'user', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
