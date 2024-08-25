import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiographyService {
  url = environment.apiUrl + 'biographies/';

  constructor(
    private http: HttpClient
  ) { }

  getBiographyies(): Observable<any> {
    return this.http.get(this.url).pipe(map(response => response));
  }

  getBiographyById(id: number): Observable<any> {
    return this.http.get(this.url + id).pipe(map(response => response));
  }

  addBiography(body: any): Observable<any> {
    return this.http.post(this.url, body).pipe(map(response => response));
  }

  updateBiography(id: number, body: any): Observable<any> {
    return this.http.put(this.url + id, body).pipe(map(response => response));
  }

  deleteBiography(id: number): Observable<any> {
    return this.http.delete(this.url + id).pipe(map(response => response));
  }
}
