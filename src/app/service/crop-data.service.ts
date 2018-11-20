import { Injectable } from "@angular/core";
import { SecureHttp } from "../shared/secure-http";
import { Observable } from "rxjs";
import { API_BASE } from "../constants/api-endpoints.constant";
import { HttpUtil } from "../util/http.util";
import { Response } from '@angular/http';
import { StorageUtil } from "../util/storage.util";
import { User } from "../model/user.model";
import { SearchService } from "./search.service";
import { UserService } from "./user.service";

@Injectable()
export class CropDataService {
    constructor(private _secureHttp: SecureHttp,private _userService:UserService
    ) {
    }

    public getCropDetails(): Observable<any> {
        const userId = this._userService.getCurrentUser().id;

        const url = API_BASE+'/crops/'
            + userId ;

        return this._secureHttp.get(url)
            .map((response: Response) => HttpUtil.extractData<any>(response))
            .finally(() => {
            });
    }

    public getCurrentCropDetails(): Observable<any> {
        const userId = this._userService.getCurrentUser().id;

        const url = API_BASE+'/getData/'
            + userId ;

        return this._secureHttp.get(url)
            .map((response: Response) => HttpUtil.extractData<any>(response))
            .finally(() => {
            });
    }

    public getAllCrops(): Observable<any> {

        const url = API_BASE + '/crops';
        return this._secureHttp.get(url)
            .map((res: any) => res.json())
            .map((json: any) => json)
            .finally(() => {
            });
    }

    public getAllCropsBySearchText(text:string): Observable<any> {
        debugger
        const url = API_BASE + '/crops/'+text;
        return this._secureHttp.get(url)
            .map((res: any) => res.json())
            .map((json: any) => json)
            .finally(() => {
            });
    }


    public getPrediction(id:string): Observable<any> {
        const url = API_BASE + '/prediction/'+id;
        return this._secureHttp.get(url)
            .map((res: any) => res.json())
            .map((json: any) => json)
            .finally(() => {
            });
    }

}