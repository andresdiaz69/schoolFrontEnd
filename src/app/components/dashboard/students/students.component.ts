import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from '../../../services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit{
  listStudents: Student[] = [];
  loading = false;
  
  constructor(private studentService: StudentService,
              private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void{
    this.loading = true;
    this.studentService.getAllStudents().subscribe(data => {
      this.listStudents = data;
      console.log(data);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Error getting students'); //+ data.message
    });
  }

  deleteStudent(id: number): void{
    this.loading = true;
    this.studentService.deleteStudent(id).subscribe(data => {
      this.loading = false;
      this.getStudents();
      this.toastr.success(data.message);
    }, error => {
      this.loading = false;
      this.toastr.error('Error deleting student'); //+ data.message
    });
  }

}
