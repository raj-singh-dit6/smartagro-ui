// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DateRangeComponent} from './daterange.component'
 

@NgModule({
    imports: [CommonModule, FormsModule, BrowserModule, RouterModule,NgbModule],
    declarations: [DateRangeComponent],
    exports: [DateRangeComponent],
    entryComponents: [],
})

export class DateRangeModule { }