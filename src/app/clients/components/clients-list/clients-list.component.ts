import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../model/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent {
  @Input() clients: Client[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)
  displayedColumns: string[] = ['name', 'surname', 'cpf', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(client: Client) {
    this.edit.emit(client);
  }

  onDelete(client: Client) {
    this.delete.emit(client);
  }
}
