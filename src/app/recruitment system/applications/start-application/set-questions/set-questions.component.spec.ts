import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetQuestionsComponent } from './set-questions.component';

describe('SetQuestionsComponent', () => {
  let component: SetQuestionsComponent;
  let fixture: ComponentFixture<SetQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
