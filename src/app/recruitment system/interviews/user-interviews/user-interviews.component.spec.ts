import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterviewsComponent } from './user-interviews.component';

describe('UserInterviewsComponent', () => {
  let component: UserInterviewsComponent;
  let fixture: ComponentFixture<UserInterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInterviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
