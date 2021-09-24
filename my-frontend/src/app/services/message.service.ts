import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import * as CryptoJS from 'crypto-js';

const API_URL = 'http://localhost:4000';

const KEY = 'KEY_1';
const SHARED_SECRET: any = 'ABCDEFGHRK';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getMessages() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.get(API_URL + '/message', httpOptions);
  }

  getMessageId(idmessage: any) {
    const user = this.storageService.getUser();
    const route = '/message/:id';
    const params = { id: idmessage.toString() };
    const strBody = '';
    const strParams = JSON.stringify(params);
    const signatureEncode = strBody + ';' + strParams + ';' + route;
    const signature = CryptoJS.SHA256(
      signatureEncode,
      SHARED_SECRET
    ).toString();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: user.token,
        'X-Key': KEY,
        'X-Route': route,
        'X-Signature': signature,
      }),
    };
    return this.http.get(API_URL + '/message/' + idmessage, httpOptions);
  }

  getMessageTag(tags: any) {
    const user = this.storageService.getUser();
    const route = '/messages/:tag';
    const params = { tag: tags };
    const strBody = '';
    const strParams = JSON.stringify(params);
    const signatureEncode = strBody + ';' + strParams + ';' + route;
    const signature = CryptoJS.SHA256(
      signatureEncode,
      SHARED_SECRET
    ).toString();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: user.token,
        'X-Key': KEY,
        'X-Route': route,
        'X-Signature': signature,
      }),
    };

    return this.http.get(API_URL + '/messages/' + tags, httpOptions);
  }

  create(msg: string, tags: string) {
    const user = this.storageService.getUser();
    const route = '/message';
    const body = {
      msg,
      tags,
    };
    const strBody = JSON.stringify(body);
    const strParams = '';
    const signatureEncode = strBody + ';' + strParams + ';' + route;
    const signature = CryptoJS.SHA256(
      signatureEncode,
      SHARED_SECRET
    ).toString();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: user.token,
        'X-Key': KEY,
        'X-Route': route,
        'X-Signature': signature,
      }),
    };
    return this.http.post(API_URL + route, body, httpOptions);
  }
}
