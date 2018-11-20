import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { API_BASE } from '../constants/api-endpoints.constant';
import { SecureHttp } from '../shared/secure-http';
import { User } from '../model/user.model';

const BASE_URL = environment.apiBaseUrl;

@Injectable()
export class SearchService {

    constructor(private _secureHttp: SecureHttp) { }

    public changeEvent = new Subject();
    public cropId: number = 0;
    public seedId: string = '';
    public fromDate: string;
    public endDate: string;

    public getFilterParams() {
        var param = '';

        if (this.fromDate) {
            param = param + (param.length > 0 ? '&' : '') + 'fromDate=' + this.fromDate;
        } else {
            param = param + (param.length > 0 ? '&' : '') + 'fromDate=null';
        }
        if (this.endDate) {
            param = param + (param.length > 0 ? '&' : '') + 'endDate=' + this.endDate;
        } else {
            param = param + (param.length > 0 ? '&' : '') + 'endDate=null';
        }
        if (this.cropId) {
            param = param + (param.length > 0 ? '&' : '') + 'brand=' + this.cropId;
        } else {
            param = param + (param.length > 0 ? '&' : '') + 'brand=null';
        }

        return param;


    }


}
