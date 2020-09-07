import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsRollComponent } from './cards-roll.component';

describe('CardsRollComponent', () => {
  let component: CardsRollComponent;
  let fixture: ComponentFixture<CardsRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
