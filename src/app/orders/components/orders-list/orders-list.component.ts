import { Component, Input } from '@angular/core';
import { Order } from '../../model/order';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent {
  @Input() orders: Order[] = [];
  displayedColumns: string[] = ['description', 'actions'];

  constructor() { }

}
