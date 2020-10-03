import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterviewComponent } from './view-interview.component';

describe('ViewInterviewComponent', () => {
  let component: ViewInterviewComponent;
  let fixture: ComponentFixture<ViewInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
