import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { StudentsComponent } from './components/dashboard/students/students.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NewstudentComponent } from './components/dashboard/students/newstudent/newstudent.component';
import { TeachersComponent } from './components/dashboard/teachers/teachers.component';
import { NewteacherComponent } from './components/dashboard/teachers/newteacher/newteacher.component';
import { GradesComponent } from './components/dashboard/grades/grades.component';
import { NewgradeComponent } from './components/dashboard/grades/newgrade/newgrade.component';
import { DetailComponent } from './components/dashboard/grades/detail/detail.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    StudentsComponent,
    LoadingComponent,
    NewstudentComponent,
    TeachersComponent,
    NewteacherComponent,
    GradesComponent,
    NewgradeComponent,
    DetailComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
