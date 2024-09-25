import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) 
  { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Student/';
  }

  getAllStudents(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetAllStudents')
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl +  id)
  }
  
  saveStudent(student: Student): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, student)
  }

  updateStudent(id:number, student: Student): Observable<any> {
    student.id = id;
    return this.http.put(this.myAppUrl + this.myApiUrl, student)
  }

  getStudentById(id:number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }
}
