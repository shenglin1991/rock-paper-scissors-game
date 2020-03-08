import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Choice, GameComponent} from './game.component';
import {UserService} from '../../services/user.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [UserService]
    })
      .compileComponents();

    userService = TestBed.inject(UserService);
    spyOn(userService, 'getCurrentUser').and.returnValue({name: 'myUser', score: 10});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[ngOnInit] should get user information', () => {
    expect(component.user.name).toEqual('myUser');
    expect(component.user.score).toEqual(10);
  });

  it('[play] should make choice and calculate result', () => {
    spyOn(component, 'calculateResult').and.callThrough();
    spyOn(userService, 'win').and.callThrough();
    component.play(Choice.PAPER);
    fixture.detectChanges();
    expect(component.calculateResult).toHaveBeenCalled();
    expect(component.choice).toEqual(Choice.PAPER);
  });

  it('[calculateResult] should get fair match', () => {
    component.computer = Choice.PAPER;
    component.choice = Choice.PAPER;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(0);

    component.computer = Choice.ROCK;
    component.choice = Choice.ROCK;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(0);

    component.computer = Choice.ROCK;
    component.choice = Choice.ROCK;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(0);
  });

  it('[calculateResult] user should win the match', () => {
    spyOn(userService, 'win').and.returnValue(component.user.score + 1 );
    component.computer = Choice.ROCK;
    component.choice = Choice.PAPER;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(1);
    expect(component.user.score).toEqual(11);

    component.computer = Choice.PAPER;
    component.choice = Choice.SCISSORS;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(1);

    component.computer = Choice.SCISSORS;
    component.choice = Choice.ROCK;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(1);
  });

  it('[calculateResult] user should lose the match', () => {
    component.computer = Choice.ROCK;
    component.choice = Choice.SCISSORS;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(-1);
    expect(component.computerScore).toEqual(1);

    component.computer = Choice.PAPER;
    component.choice = Choice.ROCK;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(-1);

    component.computer = Choice.SCISSORS;
    component.choice = Choice.PAPER;
    component.calculateResult();
    fixture.detectChanges();
    expect(component.result).toEqual(-1);
  });
});
