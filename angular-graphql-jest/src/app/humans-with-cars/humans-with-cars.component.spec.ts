import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumansWithCarsComponent } from './humans-with-cars.component';

describe('HumansWithCarsComponent', () => {
  let component: HumansWithCarsComponent;
  let fixture: ComponentFixture<HumansWithCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumansWithCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumansWithCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
