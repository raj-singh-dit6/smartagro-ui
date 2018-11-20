import * as _ from 'lodash';
import { UserRole } from './user-role.model';

export class User {
  id:number;
  adharCardNo:string;
  email:string;
  mobileNumber:string;
  name:string;
	soilHealthCardId:string;
  username:string;

  constructor(id:number,username:string,adharCardNo:string,name:string,soilHealthCardId:string,email:string,mobileNumber:string){
  this.id=id;
  this.username=username;
  this.name=name;
  this.adharCardNo=adharCardNo;
  this.soilHealthCardId=soilHealthCardId;
  this.email=email;
}
  
  static fromJsonFlat({ id,username,adharCardNo,name,soilHealthCardId,email,mobileNumber }) {
    let ret = new User(id,username,adharCardNo,name,soilHealthCardId,email,mobileNumber);
    return ret;
  }

}
