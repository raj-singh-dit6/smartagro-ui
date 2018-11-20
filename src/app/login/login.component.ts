import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { AuthStatus } from '.';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { LoginRequest } from '../model/login-request.model';
import { StorageUtil } from '../util/storage.util';
import { AuthService } from '../service/auth.service';
import { SpinnyService } from '../shared/spinny/spinny.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../service/search.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {

    login = {
        username: '',
        password: '',
        remember: true
    };
    showErrorMessage = false;

    public _authStatus: AuthStatus;
    public _authenticatedUserSubs: Subscription;
    public alerts: any = [];

    constructor(private _router: Router,private route:ActivatedRoute,
        private _toastr: ToastrService,
        private _authService: AuthService,
        private _spinnyService: SpinnyService,
        private _userService:UserService,
    ){  }

    ngOnInit() {

    }

    onLoginFormSubmit(form: any): void {
      if (form && !form.valid) {
          this._toastr.show('Please fill in all details', 'Error!', {
              toastComponent: ToastComponent,
              toastClass: 'error-toast-class',
              disableTimeOut: true,
              positionClass: 'toast-top-center'
          });
          return;
      }
      // New login request
      const loginRequest = new LoginRequest(
          this.login.username,
          this.login.password
      );
      this.doAuthentication(loginRequest);
  }

  doAuthentication(loginRequest: LoginRequest): void {
      this._spinnyService.start();
      this._authenticatedUserSubs = this._authService.authenticate(loginRequest)
      .subscribe((result) => {
        if (result['success']) {
            this._spinnyService.stop();
            let data: any = result['data'];
            StorageUtil.setSessionKey(data['accessToken']);
            StorageUtil.setUser(data['user']);
            this._userService.currentUser= User.fromJsonFlat(StorageUtil.getUser())
            this._router.navigateByUrl("/smartagro/dashboard");
            this._toastr.clear();
        } else {
          this._spinnyService.stop();
          this._toastr.show('Wrong credentials', 'Error', {
            toastComponent: ToastComponent,
            toastClass: 'error-toast-class',
            // timeOut: 2000,
            disableTimeOut: true,
            positionClass: 'toast-top-center'
          });
        }
      },(error)=>{
        this._spinnyService.stop();
        this._toastr.show('Wrong credentials', 'Error', {
          toastComponent: ToastComponent,
          toastClass: 'error-toast-class',
          // timeOut: 2000,
          disableTimeOut: true,
          positionClass: 'toast-top-center'
        });
      });
  }

  rememberMe() {

  }

  forgotPassword() {

  }

}
