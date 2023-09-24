import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup 
  returnUrl!: string;
  constructor( private accountService : AccountService, private router:Router,private activatedRoute: ActivatedRoute ) {}

  ngOnInit() {
    const queryParams = this.activatedRoute.snapshot.queryParams as { returnUrl: string };
    this.returnUrl = queryParams.returnUrl || '/';
    this.createLoginForm();
  }
  
 
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
 
  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(() => {
     this.router.navigateByUrl(this.returnUrl);
    }, error => {
     console.log(error);
    });
  
  
  }
 }