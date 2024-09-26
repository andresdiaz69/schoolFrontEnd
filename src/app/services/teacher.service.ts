import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) 
  { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Teacher/';
  }

  getAllTeachers(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetAllTeachers')
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl +  id)
  }
  
  saveTeacher(teacher: Teacher): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, teacher)
  }

  updateTeacher(id:number, teacher: Teacher): Observable<any> {
    teacher.id = id;
    return this.http.put(this.myAppUrl + this.myApiUrl, teacher)
  }

  getTeacherById(id:number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }
}
