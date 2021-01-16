import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-autocomplete';
  control = new FormControl();
  movies = [
    { id: 1, title: 'Avengers' },
    { id: 2, title: 'X Men' },
    { id: 3, title: 'Captain America' },
    { id: 3, title: 'Fast and Furious' },
    { id: 3, title: 'Hulk' },
    { id: 3, title: 'Iron Man' }
  ];
}
