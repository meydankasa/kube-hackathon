import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-tour',
  templateUrl: './slider-tour.page.html',
  styleUrls: ['./slider-tour.page.scss'],
})
export class SliderTourPage implements OnInit {

  constructor() { }
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
  }

}
