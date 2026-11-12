import { Component, OnInit, Input } from '@angular/core';
import { Popularity } from '../../data/popularity';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css'],
  standalone: false
})
export class ThermometerComponent implements OnInit {
  @Input() popularity: Popularity;
  @Input() label: string = 'Popularity';

  constructor() { }

  ngOnInit() { }
}
