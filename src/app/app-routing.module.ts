import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'products/:paramsId/:paramsId2', component: ProductsComponent},
  {path: '', redirectTo:'products/1/0', pathMatch:'full'},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
