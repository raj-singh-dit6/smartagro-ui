import { Observable } from 'rxjs/Observable';

/**
 * The storage types available for usage
 *
 * @export
 * @enum {number}
 */


export abstract class StorageUtil {
  
  static KEY_SESSION="accessToken";
  static KEY_USER="user";


  public static setSessionKey(value:string){
    localStorage.setItem (this.KEY_SESSION,value);
  }

  public  static getSessionKey(){
    return localStorage.getItem(this.KEY_SESSION);
  }

  public static clearAll(){
    localStorage.removeItem(this.KEY_SESSION);
    localStorage.removeItem(this.KEY_USER);

  }

  public static setUser(value:any){
    localStorage.setItem (this.KEY_USER,JSON.stringify(value));
  }

  public static getUser(){
   return localStorage.getItem(this.KEY_USER) ?JSON.parse(localStorage.getItem(this.KEY_USER)) : null;
  }

}
