import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/dashboard/students/students.component';
import { NewstudentComponent } from './components/dashboard/students/newstudent/newstudent.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children : [
    { path: '', component : StudentsComponent },
    { path: 'students', component : StudentsComponent },
    { path: 'students/new', component: NewstudentComponent },
    { path: 'students/edit/:id', component: NewstudentComponent }
    // { path: 'teachers', component : TeacherComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
