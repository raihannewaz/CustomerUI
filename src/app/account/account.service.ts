import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Address } from '../shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

   baseUrl = environment.apiUrl;
   private currentUserSource = new ReplaySubject<User | null>(0); // 1 is the buffer size
   currentUser$ = this.currentUserSource.asObservable();
   
   constructor(private http: HttpClient, private router: Router) { }
 


   loadCurrentUser(token: string | null): Observable<User | null> {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
  
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
  
    return this.http.get<User>(this.baseUrl + 'Account', { headers }).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
        return user;
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
  
  



   
   login(values: any) {
     return this.http.post<User>(this.baseUrl + 'Account/login', values).pipe(
       map((user: User) => {
         if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
         }
       })
     );
   }
 
   register(values: any) {
     return this.http.post<User>(this.baseUrl + 'Account/register', values).pipe(
       map((user: User) => {
         if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
         }
       })
     );
   }
   
   logout() {
     localStorage.removeItem('token');
     this.currentUserSource.next(null);
     this.router.navigateByUrl('/');
   }
 
   checkEmailExists(email: string) {
     return this.http.get(this.baseUrl + 'Account/emailexists?email=' + email);
   }

   getUserAddress(){
    return this.http.get<Address>(this.baseUrl+'account/address')
  }

   updateUserAddress(address: Address) {
    return this.http.post(this.baseUrl + 'Account/address', address);
  }
 }
 