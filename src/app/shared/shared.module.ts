import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination'
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { OrderTotalComponent } from './order-total/order-total.component';





@NgModule({
  declarations: [ PagingHeaderComponent, PagerComponent, OrderTotalComponent


  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalComponent
    

  ]
})
export class SharedModule { }
