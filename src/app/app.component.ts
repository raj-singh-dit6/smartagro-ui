import { Component, ViewContainerRef } from '@angular/core';
import { SpinnyService } from './shared/spinny/spinny.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router,private _spinnyService: SpinnyService,
    private _vcRef: ViewContainerRef,
  ) {
    _spinnyService.defaultViewContainer = _vcRef;
  }
}
