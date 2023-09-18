import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('search', {static:true}) searchTerm!: ElementRef;
products!:Product[];
brands!: Brand[];
categories!: Category[];
subcategories!: SubCategory[];
shopParams = new ShopParams();
totalCount = 0;
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
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response!.data;
      this.totalCount = response!.count;
      this.shopParams.pageNumber = response!.pageIndex;
      this.shopParams.pageSize = response!.pageSize;

    });
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
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onCategorySelected(categoryId:number){
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSubCategorySelected(subCategoryId:number){
    this.shopParams.subCategoryId = subCategoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    const sortValue = event.target.value;
    this.shopParams.sort = sortValue;
    this.getProducts();
  }

  onPageChanged(event:any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
    

  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
  this.getProducts();
  }
  
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
