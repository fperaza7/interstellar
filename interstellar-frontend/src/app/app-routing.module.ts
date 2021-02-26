import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { SpacecraftsComponent } from './components/spacecrafts/spacecrafts.component';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'home', component: HomeComponent, canActivate: [UserGuard]},
  { path: 'spacecrafts', component: SpacecraftsComponent, canActivate: [UserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
