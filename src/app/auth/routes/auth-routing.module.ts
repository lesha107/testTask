import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../component/auth.component';
import { AUTH_ROUTES } from './auth-routes';
import { SignInComponent } from '../pages';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: AUTH_ROUTES.SIGN_IN.path,
        component: SignInComponent,
      },
      {
        path: '',
        redirectTo: AUTH_ROUTES.SIGN_IN.path,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
