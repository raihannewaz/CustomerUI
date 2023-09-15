import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { Pagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = 'GadgetPoint';
 products: Product[] | undefined;

  constructor(private http: HttpClient){}


ngOnInit():void{
  
this.http.get<Pagination>('http://localhost:5250/api/Product?pageSize=3').subscribe((response: Pagination )=>{
  console.log(response);
  this.products = response.data;
})

}
  
}
