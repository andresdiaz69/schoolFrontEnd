import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Gender } from '../../../../models/gender';
import { GenderService } from '../../../../services/gender.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newstudent',
  templateUrl: './newstudent.component.html',
  styleUrls: ['./newstudent.component.css'],
})
export class NewstudentComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number | null;
  isEditMode = false;
  genders: Gender[]  =  [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private genderService: GenderService,
    private toastr: ToastrService
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      idGender: ['', Validators.required],
      dateOfBirth: [Validators.required],
      active: [Validators.required]
    });

    this.studentId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getGenders();
    if (this.studentId) {
      this.isEditMode = true;
      this.loadStudentData();
    }
  }

  loadStudentData(): void {
    this.loading = true;

    this.studentService
        .getStudentById(this.studentId!)
        .subscribe(data => {
          console.log(data);
          this.loading = false;
          const formattedDate = data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '';

          this.studentForm.patchValue({
            name: data.name,
            lastName: data.lastName,
            idGender: data.idGender,
            dateOfBirth: formattedDate,
            active: data.active
          });
        }, error => {
          this.toastr.error('Error cargando info estudiante!', 'Error');
          this.loading = false;
        });
  }

  getGenders(): void{
    this.loading = true
    ;
    this.genderService.getAllGenders()
    .subscribe(data => {
      this.genders = data;
      this.loading = false;
    }, error => {
      this.toastr.error('Error obteniendo generos', 'Error');
      this.loading = false;
    });
  }

  saveInfo() {
    this.loading = true;

    if (this.isEditMode) {
      this.studentService
        .updateStudent(this.studentId!, this.studentForm.value)
        .subscribe(data => {
          this.toastr.success('Estudiante guardado OK');
          this.router.navigate(['/dashboard']);
          this.loading = false;
        }, error => {
          this.toastr.error('Ocurrio un error!', 'Error');
          this.router.navigate(['/dashboard']);
          this.loading = false;
        });
    } else {
      this.studentService.saveStudent(this.studentForm.value)
      .subscribe(data => {
        this.toastr.success('Estudiante guardado OK');
        this.router.navigate(['/dashboard']);
        this.loading = false;
      }, error => {
        this.toastr.error('Ocurrio un error!', 'Error');
        this.router.navigate(['/dashboard']);
        this.loading = false;
      });
    }
  }
}
