import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EverComponent } from './ever.component';

describe('EverComponent', () => {
  let component: EverComponent;
  let fixture: ComponentFixture<EverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
