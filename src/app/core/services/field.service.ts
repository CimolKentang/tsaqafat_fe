import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  url = environment.apiUrl + "field/";

  constructor(
    private http: HttpClient
  ) { }

  getFields(): Observable<any> {
    return this.http.get(this.url).pipe(map(response => response));
  }

  createField(body: any): Observable<any> {
    return this.http.post(this.url, body).pipe(map(response => response));
  }

  getFieldById(id: number): Observable<any> {
    return this.http.get(this.url + id).pipe(map(response => response));
  }

  updateField(id: number, body: any): Observable<any> {
    return this.http.put(this.url + id, body).pipe(map(response => response));
  }

  deleteField(id: number): Observable<any> {
    return this.http.delete(this.url + id).pipe(map(response => response));
  }
}
