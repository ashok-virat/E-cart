import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms'

import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToysComponent } from './toys/toys.component';
import { DressComponent } from './dress/dress.component';
import { ShoesComponent } from './shoes/shoes.component';

@NgModule({
  declarations: [HomeComponent, ViewProductComponent, EditProductComponent, ToysComponent, DressComponent, ShoesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {path:'home',component:HomeComponent},
      {path:'view/:productId',component:ViewProductComponent},
      {path:'edit/:productId',component:EditProductComponent},
      {path:'admintoys',component:ToysComponent},
      {path:'admindress',component:DressComponent},
      {path:'adminshoes',component:ShoesComponent}
    ])
  ]
})
export class UserHomeModule { }
