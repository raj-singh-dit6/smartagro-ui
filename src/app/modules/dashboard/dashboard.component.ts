import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkStatusComponent } from './work-status/work-status.component';
import { MODAL_ATTRIBUTES } from '../../constants/application-setting.constant';
import { SpinnyService } from '../../shared/spinny/spinny.service';
import {  Subscription } from 'rxjs';
import { Overview } from '../../model/overview.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../service/search.service';
import { CropDataService } from '../../service/crop-data.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { StorageUtil } from '../../util/storage.util';
import { SensorData } from '../../model/sensor-data.model';
import { Crop } from '../../model/crop.model';
import { Seed } from '../../model/seed.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  crop: Crop;
  seed: Seed;
  sensordata:SensorData;
  showXAxis = false;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  nvalue = [
    {
      'name': '',
      'value': 0
    },
  ]

  pvalue = [
    {
      'name': '',
      'value': 0
    },
  ]

  kvalue = [
    {
      'name': '',
      'value': 0
    },
  ]

  humidity = [
    {
      'name': '',
      'value': 0
    },
  ]

  relativehumidity = [
    {
      'name': '',
      'value': 0
    },
  ]

  soilmoisture = [
    {
      'name': '',
      'value': 0
    },
  ]

    tempreture = [
      {
        'name': '',
        'value': 0
      },
    ]
  sub1: Subscription;

  constructor(private _router: Router,private cropDataService:CropDataService, private _toastr: ToastrService, private _spinnyService: SpinnyService, public _searchService: SearchService) { }

  ngOnInit() {
      this.getCropSeedDetails();
      this.getCurrentCropDetails();
  }

  getCropSeedDetails() {
    this._spinnyService.start();
    this.cropDataService.getCropDetails().subscribe(
      (response) => {
        if (response['success']) {
          this._spinnyService.stop();
          if (response['data'] && response['data']['crop']) {
            this.crop = response['data']['crop'];
          }
          if (response['data'] && response['data']['seed']) {
            this.seed = response['data']['seed'];
          }
        } else {
          this._spinnyService.stop();
          this._toastr.show('Could not find ideal details for your current crop', 'Error', {
            toastComponent: ToastComponent,
            toastClass: 'error-toast-class',
            // timeOut: 2000,
            disableTimeOut: true,
            positionClass: 'toast-top-center'
          });
        }
      }, (error) => {
        this._spinnyService.stop();
        if (JSON.parse(error['_body'])['error'] && JSON.parse(error['_body'])['error'] == 'Unauthorized') {
          StorageUtil.clearAll();
          this._router.navigate(['login']);
        } else {
          this._toastr.show('Error Occurred', 'Error', {
            toastComponent: ToastComponent,
            toastClass: 'error-toast-class',
            // timeOut: 2000,
            disableTimeOut: true,
            positionClass: 'toast-top-center'
          });
        }
      });
  }

  getCurrentCropDetails() {
    this._spinnyService.start();
    this.cropDataService.getCurrentCropDetails().subscribe(
      (response) => {
        if (response['success']) {
          this._spinnyService.stop();
          if (response['data']) {
            let data:SensorData[]= response['data']
            this.sensordata = data[0];
            this.initializeData();
          }
        } else {
          this._spinnyService.stop();
          this._toastr.show('Could not find current crop details', 'Error', {
            toastComponent: ToastComponent,
            toastClass: 'error-toast-class',
            // timeOut: 2000,
            disableTimeOut: true,
            positionClass: 'toast-top-center'
          });
        }
      }, (error) => {
        this._spinnyService.stop();
        if (JSON.parse(error['_body'])['error'] && JSON.parse(error['_body'])['error'] == 'Unauthorized') {
          StorageUtil.clearAll();
          this._router.navigate(['login']);
        } else {
          this._toastr.show('Error Occurred', 'Error', {
            toastComponent: ToastComponent,
            toastClass: 'error-toast-class',
            // timeOut: 2000,
            disableTimeOut: true,
            positionClass: 'toast-top-center'
          });
        }
      });
  }

  initializeData() {
    this.nvalue = [];
    this.pvalue = [];
    this.kvalue = [];
    this.tempreture=[];
    this.humidity=[];
    this.relativehumidity=[];
    this.soilmoisture=[];
    if (this.sensordata.nvalue) {
      this.nvalue.push(
        {
          'name': '',
          'value': Math.round(parseFloat(this.sensordata.nvalue))
        },
      )
    }

    if (this.sensordata.pvalue) {
      this.pvalue.push(
        {
          'name': '',
          'value': Math.round(parseFloat(this.sensordata.pvalue))
        }
      )
    }

    if (this.sensordata.kvalue) {
      this.kvalue.push(
        {
          'name': '',
          'value': Math.round(parseFloat(this.sensordata.kvalue))
        }
      )
    }


    if (this.sensordata.humidity) {
      this.humidity.push(
        {
          'name': '',
          'value': Math.round(parseFloat(this.sensordata.humidity))
        }
      )
    }

    if (this.sensordata.relativehumidity) {
      this.relativehumidity.push(
        {
          'name': '',
          'value': Math.round(parseFloat(this.sensordata.relativehumidity))
        }
      )
    }

    if (this.sensordata.soilmoisture) {
      this.soilmoisture.push(
        {
          'name': '',
          'value': Math.round(parseFloat(this.sensordata.soilmoisture))
        }
      )
    }

    if (this.sensordata.tempreture) {
      this.tempreture.push(
        {
          'name': '',
          'value': Math.round(parseFloat(this.sensordata.tempreture))
        }
      )
    }

  }

}
