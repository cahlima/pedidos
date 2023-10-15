import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { ClientsService } from '../../services/clients.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients$: Observable<Client[]> | null = null;
  displayedColumns: string[] = ['name', 'surname', 'cpf', 'actions'];

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.clients$ = this.clientsService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar clientes.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(client: Client) {
    this.router.navigate(['edit', client.id], { relativeTo: this.route });
  }

  onDelete(client: Client) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse cliente?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientsService.delete(client.id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Cliente removido com sucesso!', 'X', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          },
          error: (e) => {
            if (e.error.error.sqlstate === '23503') {
              this.onError(
                'Este cliente não pode ser removido porque há um pedido ligado a ele.'
              );
            } else {
              this.onError('Erro ao tentar remover cliente.');
            }
          },
        });
      }
    });
  }
}
