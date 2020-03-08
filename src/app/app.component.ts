import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rps-game';
  constructor(private route: Router, private userService: UserService) {
    if (!userService.getCurrentUser()) {
      route.navigateByUrl('login');
    } else {
      route.navigateByUrl('game');
    }
  }
}
