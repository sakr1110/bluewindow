import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'BlueWindow';
  public isAuthenticated: boolean;
  constructor() {
    this.isAuthenticated = false;
  }

  login() {
  }

  logout() {
  }
}
