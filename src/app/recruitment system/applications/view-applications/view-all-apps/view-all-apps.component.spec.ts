import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAppsComponent } from './view-all-apps.component';

describe('ViewAllAppsComponent', () => {
  let component: ViewAllAppsComponent;
  let fixture: ComponentFixture<ViewAllAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
