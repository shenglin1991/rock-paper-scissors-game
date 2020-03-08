import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayerComponent} from './player.component';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [PlayerComponent],
      providers: [FormBuilder, UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[ngOnInit] should initiate form controllers', () => {
    expect(component.nameControl).toBeTruthy();
    expect(component.nameControl.value).toEqual('');
  });

  it('[clickContinue] should login with entered name if not logged in yet', () => {
    spyOn(userService, 'login').and.callThrough();
    component.nameControl.setValue('test');
    component.clickContinue();
    fixture.detectChanges();
    expect(userService.login).toHaveBeenCalledWith('test');
    expect(component.user.name).toEqual('test');
  });

  it('[clickContinue] should not call login with entered name if not already logged in', () => {
    spyOn(userService, 'login').and.callThrough();
    spyOn(userService, 'getCurrentUser').and.returnValue({name: 'myUser', score: 10});
    component.nameControl.setValue('test');
    component.clickContinue();
    fixture.detectChanges();
    expect(userService.login).toHaveBeenCalledTimes(0);
    expect(userService.getCurrentUser).toHaveBeenCalledTimes(2);
    expect(component.user.name).toEqual('myUser');
  });

  it('[clickContinue] should redirected to game page when logged in', () => {
    spyOn(component, 'redirectToGamePage');
    spyOn(userService, 'getCurrentUser').and.returnValue({name: 'myUser', score: 10});
    component.clickContinue();
    fixture.detectChanges();
    expect(component.redirectToGamePage).toHaveBeenCalled();
  });
});
