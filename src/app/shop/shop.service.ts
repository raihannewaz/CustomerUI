import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Brand } from '../shared/models/brand';
import { Category } from '../shared/models/category';
import { SubCategory } from '../shared/models/subcategory';
import { delay, map } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseUrl = 'http://localhost:5250/api/'
  constructor(private http: HttpClient) { }
  

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
  
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.categoryId !== 0) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }
    if (shopParams.subCategoryId !== 0) {
      params = params.append('subCategoryId', shopParams.subCategoryId.toString());
    }

    if(shopParams.search)
  {
    params = params.append('search', shopParams.search);
  }
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber); 
    params = params.append('pageSize', shopParams.pageSize);
  
    return this.http.get<Pagination>(this.baseUrl + 'Product', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  

  getBrand(){

    return this.http.get<Brand[]>(this.baseUrl+'Brand')
  }
  getCategory(){

    return this.http.get<Category[]>(this.baseUrl+'Category')
  }
  getSubCategory(){

    return this.http.get<SubCategory[]>(this.baseUrl+'SubCategory')
  }
}
