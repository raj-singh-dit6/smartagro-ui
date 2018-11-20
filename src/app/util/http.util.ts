import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

// Application internal imports
import { environment } from '../../environments/environment';
import { Exception, DefaultHttpErrors } from '../constants/exception-registry.constant';

export abstract class HttpUtil {

    /**
    * Extracts data
    *
    * @param {Response} res : http response
    * @memberof HttpUtil
    */
    public static extractData<T>(res: Response): T {
        let body: any;
        try {
            body = res.json();
        } catch (ex) {
            body = {};
        }

        return <T>(body || {});
    }

    /**
     * Get the response code from an error response. If the error isn't
     * a http response, it returns -1
     * @memberof HttpUtil
     */
    public static getResponseCode(err: any): number {
        return (err instanceof Response) ? (<Response>err).status : -1;
    }

    /**
     * Converts error response to an ErrorObservable based on the responseCode
     * @memberof HttpUtil
     */
    public static transformErrorResponse(err: any, errors: { [code: number]: Exception } = {}) {
        const errCode: number = HttpUtil.getResponseCode(err);
        return (-1 === errCode) ? Observable.throw(err) :
            errors[errCode] ? Observable.throw(errors[errCode]) : Observable.throw(HttpUtil.getHttpDefaultError(errCode));
    }

    /**
     * @param {number} code: The HTTP response code
     */
    public static getHttpDefaultError(code: number): Exception {
        const httpError: Exception = DefaultHttpErrors[code];
        if (!httpError) {
            throw new Error(`No default exception object available for response code ${code}`);
        }
        return httpError;
    }
}
