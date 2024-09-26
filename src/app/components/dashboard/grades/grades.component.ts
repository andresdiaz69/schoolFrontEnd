import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Grade } from 'src/app/models/grade';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit{
  listGrades: Grade[] = [];
  loading = false;
  
  constructor(private gradeService: GradeService,
              private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.getGrades();
  }

  getGrades(): void{
    this.loading = true;
    this.gradeService.getAllGrades().subscribe(data => {
      this.listGrades = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Error obteniendo cursos'); //+ data.message
    });
  }

  deleteGrade(id: number): void{
    this.loading = true;
    this.gradeService.deleteGrade(id).subscribe(data => {
      this.loading = false;
      this.getGrades();
      this.toastr.success(data.message);
    }, error => {
      this.loading = false;
      this.toastr.error('Error eliminando el curso'); //+ data.message
    });
  }

}
