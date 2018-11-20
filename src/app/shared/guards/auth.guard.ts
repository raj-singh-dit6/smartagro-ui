// Angular imports
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

// Application imports
import { AuthService } from '../../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(private _authService: AuthService) {}

  canActivate() {
    return this._authService.isLoggedIn();
  }
}
