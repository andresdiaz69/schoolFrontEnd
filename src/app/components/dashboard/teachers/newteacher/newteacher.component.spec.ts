import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewteacherComponent } from './newteacher.component';

describe('NewteacherComponent', () => {
  let component: NewteacherComponent;
  let fixture: ComponentFixture<NewteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewteacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
