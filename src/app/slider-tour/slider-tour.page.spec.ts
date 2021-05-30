import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTourPage } from './slider-tour.page';

describe('SliderTourPage', () => {
  let component: SliderTourPage;
  let fixture: ComponentFixture<SliderTourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderTourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderTourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
