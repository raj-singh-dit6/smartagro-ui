import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonUtil } from '../../util/common.util';

@Component({
    selector: 'app-grid-table',
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {

    constructor(public datepipe: DatePipe) { }

    @Input() columns: any;
    @Input() displayData: any;
    @Input() grid: any;

    ngOnInit(): void {
    }

    toggleExpand(record) {
        if (this.grid.expandable.isExpandable) {
            if (!this.grid.expandable.isMultipleExpand && !record.isExpanded) {
                if (this.displayData != undefined) {
                    this.displayData.forEach(element => {
                        element.isExpanded = false;
                    });
                }
            }
            record.isExpanded = !record.isExpanded;
        }
    }

    isExpired(record): boolean {
        if (record.expirationDate == null || record.expirationDate === '') {
            return false;
        } else {
            let newDate = CommonUtil.getDateFromString(new Date().toISOString());
            let recordDate = CommonUtil.getDateFromString(record.expirationDate);
            if (newDate > recordDate) {
                return true;
            } else {
                return false;
            }
        }
    }

    onSorted(event) {
        //handling cases for icons
        if (event.sortColumn === 'icon' || event.sortColumn === 'expandIcon')
            return;
        if (event.sortDirection == 'asc')
            this.displayData.sort(CommonUtil.sortFilteredRowsByField(event.sortColumn));
        else
            this.displayData.sort(CommonUtil.sortFilteredRowsByFieldDesc(event.sortColumn));
    }

}