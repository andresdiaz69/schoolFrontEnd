import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grade } from '../models/grade';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) 
  { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Grade/';
  }

  getAllGrades(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetAllGrades')
  }

  deleteGrade(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl +  id)
  }
  
  saveGrade(grade: Grade): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, grade)
  }

  updateGrade(id:number, grade: Grade): Observable<any> {
    grade.id = id;
    return this.http.put(this.myAppUrl + this.myApiUrl, grade)
  }

  getGradeById(id:number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }

  getStudentsByGradeId(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetStudentByGradeId/' + id);
  }

  savestudentsGrade(id: number, students: number[]): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl + 'AddStudents/' + id, students)
  }
}
