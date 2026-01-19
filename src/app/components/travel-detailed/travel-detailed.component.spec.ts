import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDetailedComponent } from './travel-detailed.component';

describe('TravelDetailedComponent', () => {
  let component: TravelDetailedComponent;
  let fixture: ComponentFixture<TravelDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
