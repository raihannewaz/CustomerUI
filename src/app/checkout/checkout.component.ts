import { CdkStepper } from "@angular/cdk/stepper";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { StepperComponent } from "../shared/stepper/stepper.component";
 
@Component ({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    providers: [{provide: CdkStepper, useExisting: StepperComponent}]
 })
export class CheckoutComponent implements OnInit{
    
    checkoutForm!: FormGroup;

    constructor (private fb: FormBuilder) { }


    ngOnInit() {
        this.createCheckoutForm();
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
}