import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'clients', pathMatch: 'full'
  },
  {
    path: 'clients',
    loadChildren: () => import("./clients/clients.module").then(c => c.ClientsModule)
  },
  {
    path: 'products',
    loadChildren: () => import("./products/products.module").then(c => c.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
