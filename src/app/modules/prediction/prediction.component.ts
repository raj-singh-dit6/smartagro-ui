import { Component, OnInit } from '@angular/core';
import { CropDataService } from '../../service/crop-data.service';
import { SpinnyService } from '../../shared/spinny/spinny.service';
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from '../../shared/toast/toast.component';
import { StorageUtil } from '../../util/storage.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.less']
})
export class PredictionComponent implements OnInit {
  searchKey:number=0;
  disableButton:boolean=false;
  predictionData:string;
  cropNames:string[]=[];
  constructor(private _router:Router,private _cropDataService:CropDataService,private _spinnyService:SpinnyService,private _toastr:ToastrService) {}

  toggleButton(){
    this.disableButton=!this.disableButton;
  }

  openSaveModal()
  { 
    this.getPrediction(this.searchKey.toString());
  }

  ngOnInit() {
  
  }



  getPrediction(searchKey:string) {
    this._spinnyService.start();
    this._cropDataService.getPrediction(searchKey).subscribe(
      (response) => {
        if (response['success']) {
          this._spinnyService.stop();
          if (response['data']) {
            this.predictionData= response['data']
            this.cropNames= this.predictionData.split(",");
          }
        } else {
          this._spinnyService.stop();
          this._toastr.show('Could not find any crop details for entered soil health card id', 'Error', {
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

}