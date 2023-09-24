
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = 'GadgetPoint';

  constructor(private basketService:BasketService, private accountService:AccountService){}


ngOnInit(){
  this.loadCurrentUser();
  this.loadBasket();
}
loadCurrentUser() {
  const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe(() => {
      console.log('loaded user'); 
    },error => {
      console.log(error);
    });
  
}


loadBasket() {
  const basketId=localStorage.getItem('basket_id');

  if(basketId){
    this.basketService.getBasket(basketId).subscribe(()=>{
      console.log('iniitial bakset');
    },error=>{
      console.log(error);
    }
    )
  }
}

}
