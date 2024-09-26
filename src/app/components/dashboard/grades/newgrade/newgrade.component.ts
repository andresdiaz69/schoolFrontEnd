import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/models/teacher';
import { GradeService } from 'src/app/services/grade.service';
import { TeacherService } from '../../../../services/teacher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newgrade',
  templateUrl: './newgrade.component.html',
  styleUrls: ['./newgrade.component.css']
})
export class NewgradeComponent implements OnInit {
  gradeForm: FormGroup;
  gradeId: number | null;
  isEditMode = false;
  teachers: Teacher[]  =  [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gradeService: GradeService,
    private teacherService: TeacherService,
    private toastr: ToastrService
  ) {
    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      idTeacher: ['', Validators.required],
      active: [Validators.required]
    });

    this.gradeId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getTeachers();
    if (this.gradeId) {
      this.isEditMode = true;
      this.loadGradeData();
    }
  }

  loadGradeData(): void {
    this.loading = true;

    this.gradeService
        .getGradeById(this.gradeId!)
        .subscribe(data => {
          this.loading = false;

          this.gradeForm.patchValue({
            name: data.name,
            idTeacher: data.idTeacher,
            active: data.active
          });
        }, error => {
          this.toastr.error('Error cargando info curso!', 'Error');
          this.loading = false;
        });
  }

  getTeachers(): void{
    this.loading = true
    ;
    this.teacherService.getAllTeachers()
    .subscribe(data => {
      this.teachers = data;
      this.loading = false;
    }, error => {
      this.toastr.error('Error obteniendo profesores', 'Error');
      this.loading = false;
    });
  }

  saveInfo() {
    this.loading = true;

    if (this.isEditMode) {
      this.gradeService
        .updateGrade(this.gradeId!, this.gradeForm.value)
        .subscribe(data => {
          this.toastr.success('Curso guardado OK');
          this.router.navigate(['/dashboard/grades']);
          this.loading = false;
        }, error => {
          this.toastr.error('Ocurrio un error!', 'Error');
          this.router.navigate(['/dashboard/grades']);
          this.loading = false;
        });
    } else {
      this.gradeService.saveGrade(this.gradeForm.value)
      .subscribe(data => {
        this.toastr.success('Curso guardado OK');
        this.router.navigate(['/dashboard/grades']);
        this.loading = false;
      }, error => {
        this.toastr.error('Ocurrio un error!', 'Error');
        this.router.navigate(['/dashboard/grades']);
        this.loading = false;
      });
    }
  }
}

