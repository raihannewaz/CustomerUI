import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private bservice:BreadcrumbService){}

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

}