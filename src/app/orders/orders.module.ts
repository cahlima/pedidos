import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './containers/orders/orders.component';
import { SharedModule } from './../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { OrdersItemListComponent } from './components/orders-item-list/orders-item-list.component';
import { OrderFormComponent } from './containers/order-form/order-form.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrdersListComponent,
    OrdersItemListComponent,
    OrderFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatDialogModule,
    NgIf,
  ],
  providers: [provideNgxMask()],
})
export class OrdersModule {}
