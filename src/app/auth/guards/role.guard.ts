import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppToastrService } from 'src/app/core/services';
import { APP_TOASTR_MESSAGES } from 'src/app/core/services/app-toastr/app-toastr-messages';
import { UserOptions, UserRoleEnum } from '../interfaces';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly _appToastrService: AppToastrService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._authService.userOptions$.pipe(
      map((options: UserOptions) => options.role === UserRoleEnum.ADMIN),
      tap((isAdmin) => {
        if (!isAdmin) {
          this._appToastrService.error(APP_TOASTR_MESSAGES.INVALID_ROLE, 'Auth');
        }
      })
    );
  }
}
