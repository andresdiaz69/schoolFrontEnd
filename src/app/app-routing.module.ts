import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/dashboard/students/students.component';
import { NewstudentComponent } from './components/dashboard/students/newstudent/newstudent.component';
import { TeachersComponent } from './components/dashboard/teachers/teachers.component';
import { NewteacherComponent } from './components/dashboard/teachers/newteacher/newteacher.component';
import { GradesComponent } from './components/dashboard/grades/grades.component';
import { NewgradeComponent } from './components/dashboard/grades/newgrade/newgrade.component';
import { DetailComponent } from './components/dashboard/grades/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children : [
    { path: '', component : StudentsComponent },
    
    { path: 'students', component : StudentsComponent },
    { path: 'students/new', component: NewstudentComponent },
    { path: 'students/edit/:id', component: NewstudentComponent },

    { path: 'teachers', component : TeachersComponent },
    { path: 'teachers/new', component : NewteacherComponent },
    { path: 'teachers/edit/:id', component : NewteacherComponent },

    { path: 'grades', component : GradesComponent },
    { path: 'grades/new', component : NewgradeComponent },
    { path: 'grades/edit/:id', component : NewgradeComponent },
    { path: 'grades/detail/:id', component : DetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
