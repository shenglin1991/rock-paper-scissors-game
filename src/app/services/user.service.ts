import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  registeredUsers: Array<User>;

  constructor() {
  }

  login(userName: string) {
    this.currentUser = new User();
    this.currentUser = {
      name: userName,
      score: 0
    };
    return this.currentUser;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  win(): number {
    this.currentUser.score += 1;
    return this.currentUser.score;
  }
}
