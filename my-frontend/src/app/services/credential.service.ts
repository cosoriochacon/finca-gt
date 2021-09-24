import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:4000';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CredentialService {
  constructor(private http: HttpClient) {}

  getCredentials() {
    return this.http.get(API_URL + '/credential', httpOptions);
  }

  create(key: string, sharedSecret: string) {
    const body = {
      key,
      shared_secret: sharedSecret,
    };
    return this.http.put(API_URL + '/credential', body, httpOptions);
  }
}
