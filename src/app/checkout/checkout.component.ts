import { CdkStepper } from "@angular/cdk/stepper";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { StepperComponent } from "../shared/stepper/stepper.component";
import { AccountService } from "../account/account.service";
import { NavigationExtras, Router } from "@angular/router";
import { BasketService } from "../basket/basket.service";
 
@Component ({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    providers: [{provide: CdkStepper, useExisting: StepperComponent}]


 })
export class CheckoutComponent implements OnInit{
    checkoutForm!: FormGroup;
    addressData!: any;
    deliveryMethodId!: number;

    constructor(private fb: FormBuilder,private basketService:BasketService ,private accountService: AccountService, private router:Router) { }

    ngOnInit() {
        this.createCheckoutForm();
        this.getAddressFromValues();
        this.getDeliveryMethodValue();
    }

    createCheckoutForm(){
        this.checkoutForm = this.fb.group({
            addressForm : this.fb.group({
                firstName: [null, Validators.required],
                lastName: [null, Validators.required],
                street: [null, Validators.required],
                city: [null, Validators.required],
                state: [null, Validators.required],
                zipcode: [null, Validators.required],

            }),
            deliveryForm: this.fb.group({
                deliveryMethod: [null, Validators.required]
            }),
            paymenForm: this.fb.group({
                nameOnCard: [null, Validators.required]
            })
        });
    }

    getAddressFromValues(){
        this.accountService.getUserAddress().subscribe(address=>{
          if(address){
            this.checkoutForm.get('addressForm')?.patchValue(address);
    
          }
    
        }, error=>{
          console.log(Error);
          
        });
    }   
    getDeliveryMethodValue() {
        const basket = this.basketService.getCurrentBasketValue();
        if (basket && basket.deliveryMethodId) {
          this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')
            ?.patchValue(basket.deliveryMethodId.toString());
        }
      }
    
    
}