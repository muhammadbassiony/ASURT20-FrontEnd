import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleAppComponent } from './view-single-app.component';

describe('ViewSingleAppComponent', () => {
  let component: ViewSingleAppComponent;
  let fixture: ComponentFixture<ViewSingleAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
