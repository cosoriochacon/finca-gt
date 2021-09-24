import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:4000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = {
      username,
      password,
    };
    return this.http.post(API_URL + 'login', body, httpOptions);
  }

  register(username: string, password: string) {
    const body = {
      username,
      password,
    };
    return this.http.post(API_URL + 'register', body, httpOptions);
  }
}
