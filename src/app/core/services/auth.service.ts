import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { LocalStorageService } from './local-storage.service';
import { Auth } from '../enum/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  get token() {
    return this.localStorage.getItem(Auth.TOKEN);
  }

  login(body: any): Observable<any> {
    return this.http.post(this.url + "login", body).pipe(map(response => response));
  }

  createUser(body: any): Observable<any> {
    return this.http.post(this.url + "register", body).pipe(map(response => response));
  }

  logout() {
    this.localStorage.removeItem(Auth.TOKEN);
  }
}
