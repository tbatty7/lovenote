import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url = environment.APIEndpoint;

  constructor(private http: HttpClient) {}

  sendNote(author, recipient, category, message) {
    const loveNote = {
      author,
      recipient,
      category,
      message
    };
    const headers = new HttpHeaders({Authorization: localStorage.getItem('id_token')});
    return this.http.post(`${this.url}note/create`, loveNote, {headers});
  }

  getNotesFor(name) {
    const request = { name };
    const headers = new HttpHeaders({Authorization: localStorage.getItem('id_token')});
    return this.http.post(`${this.url}note/received`, request, {headers});
  }

  getNotesFrom(name) {
    const request = { name };
    const headers = new HttpHeaders({Authorization: localStorage.getItem('id_token')});
    return this.http.post( `${this.url}note/authored`, request, {headers});
  }

  deleteNote(id) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('id_token')});
    return this.http.get(`${this.url}note/delete/${id}`, {headers});
  }
}
