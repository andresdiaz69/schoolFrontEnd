import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  gradeStudentsForm: FormGroup;
  students: Student[] = [];
  loading = false;
  addedStudents: any[] = [];
  gradeId: number;

  constructor(private fb: FormBuilder,
              private gradeService: GradeService,
              private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService,
              private toastr: ToastrService
            )
  {
    this.gradeStudentsForm = this.fb.group({
      selectedStudent: ['']
    });
    
    this.gradeId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loading = true;

    this.getStudents();
    this.getGradeStudents();

    this.loading = false;
  }

  getStudents(): void{
    this.loading = true;
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Error obteniendo estudiantes'); //+ data.message
    });
  }

  getGradeStudents(): void{
    this.loading = true;
    this.gradeService.getStudentsByGradeId(this.gradeId ).subscribe(data => {
      this.addedStudents = data.listStudents.filter(student => student.active);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Error obteniendo estudiantes'); //+ data.message
    });
  }

  addStudent() {
    const selectedId = +this.gradeStudentsForm.get('selectedStudent')?.value;
    const selectedStudent = this.students.find(s => s.id === selectedId);

    if (selectedStudent && !this.addedStudents.some(s => s.id === selectedId)) {
      this.addedStudents.push({ ...selectedStudent, selected: false });
    }

  }

  removeStudentList(id: number){
    
    console.log(this.addedStudents);
    const student= this.addedStudents.find(student => student.id === id);

    if (student) {
      student.selected = true; 
    }

  }

  removeStudent(){
    this.addedStudents = this.addedStudents.filter(student => !student.selected);
    console.log(this.addedStudents);
  }

  saveInfo() {
    this.loading = true;
    const studentIds: number[] = this.addedStudents.map(student => student.id);

    this.gradeService.savestudentsGrade(this.gradeId, studentIds ).subscribe(data => {
      this.toastr.success('Estudiantes guardado OK');
      this.router.navigate(['/dashboard/grades']);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Error obteniendo estudiantes'); //+ data.message
    });
  }
}
