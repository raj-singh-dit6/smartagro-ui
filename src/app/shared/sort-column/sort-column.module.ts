import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SortableColumnComponent } from './sort-column.component';
import { SortService } from '../../service/SortColumn.service';


@NgModule({
    imports: [CommonModule, FormsModule, BrowserModule, RouterModule, NgbModule, ReactiveFormsModule],
    declarations: [SortableColumnComponent],
    exports: [SortableColumnComponent],
    providers:[SortService],
    entryComponents: [],
})

export class SortableColumnModule { }
