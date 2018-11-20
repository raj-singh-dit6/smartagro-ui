import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../service/user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _userService: UserService, private router: Router) {}

  canActivate() {
    if (this._userService.isLoggedIn()) {
        return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
