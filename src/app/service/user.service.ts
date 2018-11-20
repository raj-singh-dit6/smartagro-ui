import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { User } from '../model/user.model';
import { SecureHttp } from '../shared/secure-http';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { SpinnyService } from '../shared/spinny/spinny.service';
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from '../shared/toast/toast.component';
import { StorageUtil } from '../util/storage.util';

const BASE_URL = environment.apiBaseUrl;


export enum Roles {
  ViewOnly = 1,
  specialProjects,
  brands,
  tasks,
}

@Injectable()
export class UserService {

  private loggedIn = false;
  currentUser: User = null;
  public linkSelected=new Subject<string>();
  
  constructor(private http: Http, private secureHttp: SecureHttp,private _spinnyService:SpinnyService,private _toastr:ToastrService) {
    this.loggedIn = !!StorageUtil.getUser();
  }

  userHasRole(accessType: string): Boolean {  
    const user=this.getCurrentUser();
    if (user[accessType])
    {  
      return true;
    }else
    {
      return false;
    }
  }

  doAuthentication(username: string, password: string, remember: boolean) {
    this.loggedIn = false;
    StorageUtil.clearAll();
    const url = `${BASE_URL}/login?remember=${remember}`;

    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    return this.http.post(url, body)
      .map((res: Response) => res.json())
      .map((res) => {
        if (res['success']) {
          let userJson: any = res['data'];
          StorageUtil.setUser(userJson);
          StorageUtil.setSessionKey(userJson['authenticationToken']);
          this.currentUser = userJson;
          this.loggedIn = true;
        }
        return res;
      })
      .catch((error) => {
        return Observable.of(false);
      });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    return this.secureHttp.post(`${BASE_URL}/user/logout`, '')
      .map((res) => res.json());

  }

  getCurrentUser(): User {
    if(StorageUtil.getSessionKey() && StorageUtil.getUser())
    {  if (!this.currentUser) {
        this.currentUser = User.fromJsonFlat(StorageUtil.getUser());
      }
      
    }else{
      this.currentUser=null;
    } 
    return this.currentUser;
  }
}
