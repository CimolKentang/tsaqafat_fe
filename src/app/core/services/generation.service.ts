import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {
  url = environment.apiUrl + "generation/";

  constructor(
    private http: HttpClient
  ) { }

  getGenerations(): Observable<any> {
    return this.http.get(this.url).pipe(map(response => response));
  }

  createGeneration(body: any): Observable<any> {
    return this.http.post(this.url, body).pipe(map(response => response));
  }

  getGenerationById(id: number): Observable<any> {
    return this.http.get(this.url + id).pipe(map(response => response));
  }

  updateGeneration(id: number, body: any): Observable<any> {
    return this.http.put(this.url + id, body).pipe(map(response => response));
  }

  deleteGeneration(id: number): Observable<any> {
    return this.http.delete(this.url + id).pipe(map(response => response));
  }
}
