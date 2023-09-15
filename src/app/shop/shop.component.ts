import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Category } from '../shared/models/category';
import { SubCategory } from '../shared/models/subcategory';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
products!:Product[];
brands!: Brand[];
categories!: Category[];
subcategories!: SubCategory[];
shopParams = new ShopParams();
totalCount?: number;
sortOptions = [
  {name: 'Alphabetical', value:'name'},
  {name: 'Price: Low to High', value:'priceAsc'},
  {name: 'Price: High to Low', value:'priceDesc'}
];

  constructor(private shopService: ShopService){}

  ngOnInit() {
      this.getProducts();
      this.getBrands();
      this.getCategories();
      this.getSubCategories();
    
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response=>{
      this.products = response!.data;
      this.shopParams.pageNumber = response?.pageIndex;
      this.shopParams.pageSize = response?.pageSize;
      this.totalCount = response?.count;


    })
  }

  getBrands(){
    this.shopService.getBrand().subscribe(response=>{
      this.brands = [{brandId:0,brandName: 'All'}, ...response];
    })
  }

  getCategories(){
    this.shopService.getCategory().subscribe(response=>{
      this.categories = [{categoryId:0,categoryName: 'All'}, ...response];
    })
  }


  getSubCategories(){
    this.shopService.getSubCategory().subscribe(response=>{
      this.subcategories = [{subCategoryId:0,subCategoryName: 'All'}, ...response];
    })
  }

  onBrandSelected(brandId:number){
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onCategorySelected(categoryId:number){
    this.shopParams.categoryId = categoryId;
    this.getProducts();
  }

  onSubCategorySelected(subCategoryId:number){
    this.shopParams.subCategoryId = subCategoryId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    const sortValue = event.target.value;
    this.shopParams.sort = sortValue;
    this.getProducts();
  }

  onPageChange(event:any){
    this.shopParams.pageNumber = event.page;
  }
  
}
