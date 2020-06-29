import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {path: 'products/:paramsId/:paramsId2', component: ProductsComponent},
  {path: '', redirectTo:'products/1/0', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
