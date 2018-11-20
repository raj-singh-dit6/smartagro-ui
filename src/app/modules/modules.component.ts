import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.less']
})
export class ModulesComponent implements OnInit {

  constructor(private _userService: UserService) { }
  currentUser:User;
  ngOnInit() {
    this.currentUser=this._userService.currentUser;
  }

}
