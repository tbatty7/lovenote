import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  authToken: any;
  url: string = environment.APIEndpoint;

  constructor(private http: HttpClient) {}

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

  getAccount(id) {
    return this.http.get(`${this.url}account/get/${id}`);
  }

  validateAccount(user, password) {
    return this.http.get(`${this.url}account/validate/${user}/${password}`);
  }

  addLovedOne(lovedOne, id) {
    const accountData = {
      id,
      lovedOne
    };
    return this.http.post(`${this.url}account/add-loved-one`, accountData);
  }

  hasAccount(lovedOne) {
    return this.http.get(`${this.url}account/exists/${lovedOne}`);
  }

}
