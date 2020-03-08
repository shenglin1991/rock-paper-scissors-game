import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  nameControl: FormControl;
  user: User;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.nameControl = this.fb.control('', Validators.min(1));
  }

  clickContinue(): void {
    if (!this.userService.getCurrentUser()) {
      this.userService.login(this.nameControl.value);
    }
    this.user = this.userService.getCurrentUser();

    if (this.user !== null && this.user.name !== '') {
      this.redirectToGamePage();
    }
  }

  redirectToGamePage(): void {
    this.route.navigateByUrl('game').then(r => {
    });
  }

}
