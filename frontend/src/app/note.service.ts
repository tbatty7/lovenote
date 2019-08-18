import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

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

  getNotesFrom(name) {
    const request = { name };
    return this.http.post( `${this.url}/note/authored`, request);
  }

  deleteNote(id) {
    return this.http.get(`${this.url}/note/delete/${id}`);
  }
}