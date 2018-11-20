import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { StorageUtil } from '../util/storage.util';
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from './toast/toast.component';

@Injectable()
export class SecureHttp {
  constructor(private http: Http, private router: Router,
    private _toastr: ToastrService 
    ) { }

  get(url) {
    return this.http.get(url, this.getRequestOptions())
      .catch((err: Response) => this.handleError(err));
  }

  post(url, data) {
    return this.http.post(url, data, this.getRequestOptions())
      .catch((err: Response) => this.handleError(err));
  }

  put(url, data) {
    return this.http.put(url, data, this.getRequestOptions())
      .catch((err: Response) => this.handleError(err));
  }

  delete(url) {
    return this.http.delete(url, this.getRequestOptions())
      .catch((err: Response) => this.handleError(err));
  }

  private handleError(err: Response) {
    if (err.status === 401 && JSON.parse(err['_body'])['error'] && JSON.parse(err['_body'])['error'] == 'Unauthorized') {
      StorageUtil.clearAll()
      // this._toastr.clear();
      this.router.navigate(['login']);
    } else {
      this._toastr.show("Error Occured !!", 'Error', {
        toastComponent: ToastComponent,
        toastClass: 'error-toast-class',
        disableTimeOut: true,
        positionClass: 'toast-top-center'
      });
      return Observable.throw(err);
    }
  }

  private getRequestOptions(): RequestOptions {
   
    const OPTIONS = new RequestOptions({
      headers: new Headers({
        'Authorization':  'Bearer:'+StorageUtil.getSessionKey(),
        'content-type': 'application/json'      })
    });
    return OPTIONS;
  }
}
