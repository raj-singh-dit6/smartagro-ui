import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() linkClicked: EventEmitter<any> = new EventEmitter();
  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  onLinkClick(link: string) {
    this.linkClicked.emit();

    this._userService.linkSelected.next(link);
  }

}
