import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  quantity=1;
  

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private bservice:BreadcrumbService, private basketService:BasketService){}

  ngOnInit(): void {
    this.loadProduct();  
  }

  loadProduct() {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')!).subscribe(product=>{
    this.product = product;
    this.bservice.set('@productDetails', product.productName)
   }, error=>{
      console.log(error);
    });
  }


    
    addItemToBakset(){
    this.basketService.addItemToBasket(this.product,this.quantity);
    }
    
    decrementQuantity(){
      if(this.quantity>1){
        this.quantity--;
      }

    }
      
      incrementQuantity(){
this.quantity++;
      }
      

}