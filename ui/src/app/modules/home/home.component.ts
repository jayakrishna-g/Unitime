import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  curHours = new Date().getHours();
  curMinutes = new Date().getMinutes();
  constructor(public authService: AuthenticationService) {
    setInterval(() => {
      this.curHours = new Date().getHours();
      this.curMinutes = new Date().getMinutes();
    }, 1000);
  }
}
