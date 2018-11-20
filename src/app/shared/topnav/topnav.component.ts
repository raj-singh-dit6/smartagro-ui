import { Component, OnInit, EventEmitter, Output, ElementRef, Input, OnDestroy, ViewChild, TemplateRef, AfterViewChecked } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, merge } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from '../../service/search.service';
import { StorageUtil } from '../../util/storage.util';
import { Router, NavigationEnd } from '@angular/router';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnyService } from '../spinny/spinny.service';
import { Crop } from '../../model/crop.model';
import { CropDataService } from '../../service/crop-data.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  @Output()

  linkClicked: EventEmitter<any> = new EventEmitter();
  userDisplayName: string;
  selectedCrop: Crop;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  @ViewChild('cropInput') cropInput: NgbTypeahead;
  @ViewChild('loadCustomer') loadCustomerModel: TemplateRef<any>;

  @Output()
  cropSelectedSubscription: Subscription;
  searching: boolean;
  searchFailed: boolean;
  constructor(private _router: Router,
    private _searchService: SearchService,
    private _spinnyService: SpinnyService,
    private _cropDataService:CropDataService
    //router: Router
  ) {

    // router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe((event: NavigationEnd) => {
    //     if (event.url.indexOf("dashboard") >= 0) {
    //       this.isDashboard = true;
    //     } else {
    //       this.isDashboard = false
    //     }
    //     if (event.url.indexOf("spend") >= 0) {
    //       this.isSpending = true;
    //     } else {
    //       this.isSpending = false
    //     }
    //   });

  }

  ngOnInit() {
    this.userDisplayName = StorageUtil.getUser() ? StorageUtil.getUser()['name'] : '';
  }


  filteredAllCrops = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => { this.searching = true; this._spinnyService.start(); }),
      switchMap(term =>
        this._cropDataService.getAllCropsBySearchText(term)
          .do((data) => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          })
      ),
      tap(() => { this.searching = false; this._spinnyService.stop(); }),
      merge(this.hideSearchingWhenUnsubscribed)
    )

  onSelectedCrop() {
    this._searchService.cropId = this.selectedCrop && this.selectedCrop.id >0 ? this.selectedCrop.id  : null;
    // if (this._searchService.cropId) {
    //   this._searchService.changeEvent.next();
    // }
  }

  public onFocus(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }

  formatter = (x: { name: string }) => x.name;

  clearCrop() {
    this.selectedCrop.id = null;
    this._searchService.cropId = null;
    this._searchService.changeEvent.next();
  }

  ngOnDestroy() {
  }

  logout() {
    StorageUtil.clearAll();
    this._router.navigateByUrl("/login");

  }
}
