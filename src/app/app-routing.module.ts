import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ShoesListComponent} from './shoes-list/shoes-list.component';
import {RunTableComponent} from './run-table/run-table.component';


const routes: Routes = [
  {path: 'home', component: RunTableComponent},
  {path: 'shoes', component: ShoesListComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
