// Angular imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';

// Third-party imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Application imports
import { StorageUtil } from '../util/storage.util';
import { LoginRequest } from '../model/login-request.model';
import { LoginResponse } from '../model/login-response.model';
import { HttpUtil } from '../util/http.util';
import { ExceptionRegistry } from '../constants/exception-registry.constant';
import { SecureHttp } from '../shared/secure-http';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { SignUpModel } from '../model/signup.model';

declare var NProgress: any;

@Injectable()
export class AuthService {
    constructor(private _router: Router, private _secureHttp: SecureHttp,private http: Http) { }

    public isLoggedIn() {
        let retValue = true;
        if (!StorageUtil.getSessionKey()) {
            this._router.navigate(['login']);
            retValue = false;
        }
        return retValue;
    }


    public authenticate(loginRequest: LoginRequest): Observable<LoginResponse> {
        if (!loginRequest) {
            return;
        }
        const url = `${API_ENDPOINTS.AUTHENTICATION_ENDPOINT}`;
        // NProgress.start();
        return this.http
            .post(url, loginRequest)
            .map((res: Response) => res.json())
            .catch((error) => {
                return Observable.of(false);
            });
    }

    public signup(signupRequest: SignUpModel): Observable<LoginResponse> {
      if (!signupRequest) {
          return;
      }
      const url = `${API_ENDPOINTS.SIGNUP_AUTHENTICATION_ENDPOINT}`;
      // NProgress.start();
      return this.http
          .post(url, signupRequest)
          .map((response: Response) => HttpUtil.extractData<any>(response))
          .catch((err: any, observable: Observable<any>) => {
              return HttpUtil.transformErrorResponse(err, {
                  401: ExceptionRegistry.UNAUTH_ACC_DENIED
              });
          }).finally(() => {
              // NProgress.done();
          });
  }

    public passwordReset(username: any): Observable<any> {
        // NProgress.start();
        return this._secureHttp
            .post(API_ENDPOINTS.FORGET_PASSWORD_ENDPOINT + username, '')
            .map((response: Response) => HttpUtil.extractData<any>(response))
            .finally(() => {
                // NProgress.done();
            });
    }

    logout(): Observable<any> {
        return this._secureHttp.post(API_ENDPOINTS.LOGOUT_ENDPOINT, '')
            .map((res) => res.json());
    }
}
