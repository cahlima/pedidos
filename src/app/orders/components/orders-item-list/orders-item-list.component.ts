import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItem } from '../../model/orderItem';

@Component({
  selector: 'app-orders-item-list',
  templateUrl: './orders-item-list.component.html',
  styleUrls: ['./orders-item-list.component.scss'],
})
export class OrdersItemListComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderItem[]) {}
}
