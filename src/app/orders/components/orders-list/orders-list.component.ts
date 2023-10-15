import { Component, Input } from '@angular/core';
import { Order } from '../../model/order';
import { MatDialog } from '@angular/material/dialog';
import { OrdersItemListComponent } from '../orders-item-list/orders-item-list.component';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
  @Input() orders: Order[] = [];
  displayedColumns: string[] = ['description', 'actions'];

  constructor(public dialog: MatDialog, private ordersService: OrdersService) {}

  list(order: Order) {
    this.ordersService.loadByPedidoId(order.id).subscribe((r) => {
      this.dialog.open(OrdersItemListComponent, {
        data: r,
      });
    });
  }
}
