import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInterviewsComponent } from './admin-interviews.component';

describe('AdminInterviewsComponent', () => {
  let component: AdminInterviewsComponent;
  let fixture: ComponentFixture<AdminInterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInterviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
