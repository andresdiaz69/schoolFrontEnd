import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gender } from 'src/app/models/gender';
import { Teacher } from 'src/app/models/teacher';
import { GenderService } from 'src/app/services/gender.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-newteacher',
  templateUrl: './newteacher.component.html',
  styleUrls: ['./newteacher.component.css']
})
export class NewteacherComponent implements OnInit {
  teacherForm: FormGroup;
  teacherId: number | null;
  isEditMode = false;
  genders: Gender[]  =  [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private genderService: GenderService,
    private toastr: ToastrService
  ) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      idGender: ['', Validators.required],
      active: [Validators.required]
    });

    this.teacherId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getGenders();
    if (this.teacherId) {
      this.isEditMode = true;
      this.loadTeacherData();
    }
  }

  loadTeacherData(): void {
    this.loading = true;

    this.teacherService
        .getTeacherById(this.teacherId!)
        .subscribe(data => {
          this.loading = false;

          this.teacherForm.patchValue({
            name: data.name,
            lastName: data.lastName,
            idGender: data.idGender,
            active: data.active
          });
        }, error => {
          this.toastr.error('Error cargando info profesor!', 'Error');
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
      this.teacherService
        .updateTeacher(this.teacherId!, this.teacherForm.value)
        .subscribe(data => {
          this.toastr.success('Profesor guardado OK');
          this.router.navigate(['/dashboard/teachers']);
          this.loading = false;
        }, error => {
          this.toastr.error('Ocurrio un error!', 'Error');
          this.router.navigate(['/dashboard/teachers']);
          this.loading = false;
        });
    } else {
      this.teacherService.saveTeacher(this.teacherForm.value)
      .subscribe(data => {
        this.toastr.success('Profesor guardado OK');
        this.router.navigate(['/dashboard/teachers']);
        this.loading = false;
      }, error => {
        this.toastr.error('Ocurrio un error!', 'Error');
        this.router.navigate(['/dashboard/teachers']);
        this.loading = false;
      });
    }
  }
}
