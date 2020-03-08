import { Component, OnInit } from '@angular/core';
import { faHandPaper, faHandRock, faHandScissors } from '@fortawesome/free-solid-svg-icons';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  paper = faHandPaper;
  rock = faHandRock;
  scissors = faHandScissors;
  result = null;
  computer: Choice = null;
  choice: Choice = null;
  computerScore = 0;

  user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  play(choice: Choice) {
    this.choice = choice;
    this.computer = Math.floor((Math.random() * 3));
    this.calculateResult();
  }

  calculateResult(): void {
    const i = this.computer - this.choice;
    this.result = Math.abs(i) !== 2 ? i : (-1 * i / 2);

    if (this.result === 1) {
      this.user.score = this.userService.win();
    } else if (this.result === -1) {
      this.computerScore += 1;
    }
  }

}

export enum Choice {
  PAPER, ROCK, SCISSORS
}
