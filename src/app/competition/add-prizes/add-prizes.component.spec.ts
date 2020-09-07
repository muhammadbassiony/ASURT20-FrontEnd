import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrizesComponent } from './add-prizes.component';

describe('AddPrizesComponent', () => {
  let component: AddPrizesComponent;
  let fixture: ComponentFixture<AddPrizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
