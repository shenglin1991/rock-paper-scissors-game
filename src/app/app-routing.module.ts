import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './components/game/game.component';
import {AppComponent} from './app.component';
import {PlayerComponent} from './components/player/player.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: PlayerComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
