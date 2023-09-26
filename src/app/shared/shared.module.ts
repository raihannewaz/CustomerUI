import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination'
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { OrderTotalComponent } from './order-total/order-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from './stepper/stepper.component';
import { RouterModule } from '@angular/router';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';



@NgModule({
  declarations: [ PagingHeaderComponent, PagerComponent, OrderTotalComponent, StepperComponent, BasketSummaryComponent


  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule

  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
