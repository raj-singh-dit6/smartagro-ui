//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './grid.component';
import { TableComponent } from './table.component';
import { ColumnComponent } from './column.component';
import { ControlFactoryDirective } from './control-factory.directive';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared.module';
import { FilterComponent } from './filter.component';
import { SortableColumnModule } from '../sort-column/sort-column.module';

@NgModule({

        imports: [SortableColumnModule,CommonModule, FormsModule, BrowserModule, RouterModule, NgbModule, SharedModule],

        declarations: [GridComponent, FilterComponent, TableComponent, ColumnComponent, ControlFactoryDirective],

        exports: [GridComponent, TableComponent, ColumnComponent, ControlFactoryDirective],

        entryComponents: [ColumnComponent, FilterComponent, TableComponent],

        providers:[DatePipe]
})

export class GridModule { }
