import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './containers/orders/orders.component';
import { OrderFormComponent } from './containers/order-form/order-form.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'new', component: OrderFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
