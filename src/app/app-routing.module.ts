import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { CheckoutRoutingModule } from './checkout/checkout-routing.module';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
 // { path: '', component: HomeComponent },
   { path: '', component: ShopComponent, data:{breadcrumb:'Shop'} },
   { path: 'shop/:id', component: ProductDetailsComponent, data:{breadcrumb:{alias:'productDetails'}}},

   {path:'basket', loadChildren:()=>import('./basket/basket.module').then(mod=>mod.BasketModule),data:{breadcrumb:'Basket'} },

   {path:'checkout',canActivate: [AuthGuard], loadChildren:()=>import('./checkout/checkout.module').then(mod=>mod.CheckoutModule),data:{breadcrumb:'Checkout'} },

   {path:'account', loadChildren:()=>import('./account/account.module').then(mod=>mod.AccountModule),data:{breadcrumb:{skip:true}} },

   { path: '**', redirectTo: '', pathMatch: 'full' }
 
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
