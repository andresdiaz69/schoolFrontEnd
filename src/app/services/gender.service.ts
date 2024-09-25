import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) 
  { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Gender/';
  }

  getAllGenders(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetAllGenders')
  }

}
