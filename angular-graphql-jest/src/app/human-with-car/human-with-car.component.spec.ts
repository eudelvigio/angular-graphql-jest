import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanWithCarComponent } from './human-with-car.component';

describe('HumanWithCarComponent', () => {
  let component: HumanWithCarComponent;
  let fixture: ComponentFixture<HumanWithCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanWithCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanWithCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
