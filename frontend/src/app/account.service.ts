import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = 'http://localhost:4000';
  constructor(private http: HttpClient) { }
  createAccount(user, passwrd) {
    const newAccount = {
      name: user,
      password: passwrd
    };
    return this.http.post(`${this.url}/account/create`, newAccount);
  }

}
