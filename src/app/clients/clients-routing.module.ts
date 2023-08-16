import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientFormComponent } from './containers/client-form/client-form.component';
import { ClientResolver } from './guards/client.resolver'

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'new', component: ClientFormComponent, resolve: {client: ClientResolver} },
  { path: 'edit/:id', component: ClientFormComponent, resolve: {client: ClientResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
