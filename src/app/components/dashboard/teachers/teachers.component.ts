import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit{
  listTeachers: Teacher[] = [];
  loading = false;
  
  constructor(private teacherService: TeacherService,
              private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void{
    this.loading = true;
    this.teacherService.getAllTeachers().subscribe(data => {
      this.listTeachers = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Error obteniendo profesores'); //+ data.message
    });
  }

  deleteTeacher(id: number): void{
    this.loading = true;
    this.teacherService.deleteTeacher(id).subscribe(data => {
      this.loading = false;
      this.getTeachers();
      this.toastr.success(data.message);
    }, error => {
      this.loading = false;
      this.toastr.error('Error eliminando el profesor'); //+ data.message
    });
  }

}
