import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewgradeComponent } from './newgrade.component';

describe('NewgradeComponent', () => {
  let component: NewgradeComponent;
  let fixture: ComponentFixture<NewgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewgradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
