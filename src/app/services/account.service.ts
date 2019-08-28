import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  jwtHelper: JwtHelperService;
  authToken: any;
  account: any;
  url: string = environment.APIEndpoint;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  createAccount(user, passwrd) {
    const newAccount = {
      name: user,
      password: passwrd
    };
    return this.http.post(`${this.url}account/create`, newAccount);
  }

  authenticateAccount(account) {
    return this.http.post(`${this.url}account/authenticate`, account);
  }

  loggedIn() {
    const token = this.getToken();
    const tokenNotNull = token !== null;
    const tokenNotExpired = !this.jwtHelper.isTokenExpired(token);
    return tokenNotNull && tokenNotExpired;
  }

  getAccount(id) {
    this.loadToken();
    const headers = new HttpHeaders({Authorization: this.authToken});
    return this.http.get(`${this.url}account/get/${id}`, {headers});
  }

  addLovedOne(lovedOne, id) {
    const accountData = {
      id,
      lovedOne
    };
    const headers = new HttpHeaders({Authorization: this.authToken});
    return this.http.post(`${this.url}account/add-loved-one`, accountData, {headers});
  }

  hasAccount(lovedOne) {
    return this.http.get(`${this.url}account/exists/${lovedOne}`);
  }

  storeUserData(token: string, account: any) {
    // id_token is magic word used by angular-jwt to validate token
    localStorage.setItem('id_token', token);
    // account object must be turned into a string for local storage
    localStorage.setItem('account', JSON.stringify(account));
    this.authToken = token;
    this.account = account;
  }

  logout() {
    this.authToken = null;
    this.account = null;
    localStorage.clear();
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  getToken() {
    return localStorage.getItem('id_token');
  }
}
