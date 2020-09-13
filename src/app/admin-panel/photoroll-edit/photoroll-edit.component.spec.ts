import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotorollEditComponent } from './photoroll-edit.component';

describe('PhotorollEditComponent', () => {
  let component: PhotorollEditComponent;
  let fixture: ComponentFixture<PhotorollEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotorollEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotorollEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
