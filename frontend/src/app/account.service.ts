import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  createAccount(user, passwrd) {
    const newAccount = {
      name: user,
      password: passwrd
    };
    return this.http.post(`${this.url}/account/create`, newAccount);
  }

  getAccount(id) {
    return this.http.get(`${this.url}/account/get/${id}`);
  }

  validateAccount(user, password) {
    return this.http.get(`${this.url}/account/validate/${user}/${password}`);
  }

  addLovedOne(lovedOne, id) {
    const accountData = {
      id,
      lovedOne
    };
    return this.http.post(`${this.url}/account/add-loved-one`, accountData);
  }

  hasAccount(lovedOne) {
    return this.http.get(`${this.url}/account/exists/${lovedOne}`);
  }

  sendNote(author, recipient, category, message) {
    const loveNote = {
      author,
      recipient,
      category,
      message
    };
    return this.http.post(`${this.url}/note/create`, loveNote);
  }

  getNotesFor(name) {
    const request = { name };
    return this.http.post(`${this.url}/note/received`, request);
  }
}
