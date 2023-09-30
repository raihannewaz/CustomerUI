import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;
  @Output() addressDataChanged = new EventEmitter<any>();

  constructor(private accountService: AccountService) {}

  saveUserAddress() {
    const addressData = this.checkoutForm?.get('addressForm')?.value;
    this.addressDataChanged.emit(addressData);
  }
  
  
}
