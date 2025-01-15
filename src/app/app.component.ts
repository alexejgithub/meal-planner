import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet,CommonModule,MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})




export class AppComponent {
  title = 'mat-tab-routing';

  links: ILink[] = [
      { path: 'week1', label: 'Woche 1' },
      { path: 'week2', label: 'Woche 2' },
      { path: 'week3', label: 'Woche 3' },
      { path: 'week4', label: 'Woche 4' },
      { path: 'week5', label: 'Woche 5' },
      { path: 'week6', label: 'Woche 6' },

  ];

  activePath = this.links[0].path;

  onActivate(path: string) {
    console.log(this.activePath)
      this.activePath = path;
  }


}
