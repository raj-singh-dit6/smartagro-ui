// Angular imports
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

// Application imports


@Injectable()
export class ActiveSessionGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate() {
      return this._authService.isLoggedIn();
        
    }
}
