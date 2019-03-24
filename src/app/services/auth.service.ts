import { Injectable } from '@angular/core';
import { IAuth } from '../models/auth-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Ilogin } from '../models/auth-login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private IsAuth = false;
  private authStatusListener = new Subject<boolean>();
  public firstname: string;
  public id: string;
  private Timer: any;
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.IsAuth;
  }
  getUsernName() {
    return this.firstname;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();

  }

  createUser(firstName: string, lastName: string, email: string, password: string, confirmPassword: string,
    Address1: string, Address2: string, city: string, postalCode: string) {
    const authData: IAuth = {
      firstName: firstName, lastName: lastName, email: email, password: password, confirmPassword: confirmPassword,
      Address1: Address1, Address2: Address2, city: city, postalCode: postalCode
    };

    this.http.post("/api/user/register", authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      }, error => {
        this.authStatusListener.next(false);
      });

  }

  login(email: string, password: string) {
    const authData: Ilogin = { email: email, password: password };

    this.http.post<{ token: string, fname: string, _id: string, expiresIn: number }>("/api/user/login", authData)
      .subscribe(response => {

        const token = response.token;
        this.token = token;
        console.log(this.token);

        if (token) {

          this.id = response._id;
          this.firstname = response.fname;
          const tokenEpiryTime = response.expiresIn;
          this.setTimer(tokenEpiryTime);
          const currentDate = new Date;
          const expiryDate = new Date(currentDate.getTime() + tokenEpiryTime * 1000);
          this.localStorageToken(token, this.firstname, expiryDate);
          this.IsAuth = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
          return token;
        }

      }, error => {
        this.authStatusListener.next(false);
      });
  }

  authenticateUser() {
    const currentAuthUser = this.getTokenData();
    if (!currentAuthUser) {
      return;
    }
    const currentDate = new Date();
    const expiry = currentAuthUser.expiryDate.getTime() - currentDate.getTime();
    if (expiry > 0) {
      this.token = currentAuthUser.token;
      this.IsAuth = true;
      this.firstname = currentAuthUser.firstname;
      this.setTimer(expiry / 1000);
      this.authStatusListener.next(true);
    }
  }
  logout() {

    this.token = null;
    this.IsAuth = false;
    this.authStatusListener.next(false);
    this.firstname = null;
    clearTimeout(this.Timer);
    this.clearLocalStorageToken();
    this.router.navigate(['/']);
  }
  private setTimer(duration: number) {
    console.log("Set timer" + duration);
    this.Timer = setTimeout(() => {
      this.logout();
    }, duration * 1000);

  }

  // Store the token in local storage on front side
  private localStorageToken(token: string, firstname: string, expiryDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiry', expiryDate.toISOString());
    localStorage.setItem('firstname', firstname);

  }
  private clearLocalStorageToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('firstname');
  }

  private getTokenData() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiry');
    const firstname = localStorage.getItem('firstname');

    if (!token || !expiryDate) {
      return;
    }
    return {
      token: token,
      expiryDate: new Date(expiryDate),
      firstname: firstname
    }
  }
}

