import { Component, OnInit, Pipe, PipeTransform, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { IfStmt } from '@angular/compiler';
import { CommonUtil } from '../../util/common.util';
@Component({
    selector: 'app-grid-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})

export class FilterComponent implements OnInit {
    
    
    constructor() {
    }

    ngOnInit(): void {
        this.type = this.col.filter == undefined || this.col.filter.type == undefined
            ? 'text' : this.col.filter.type;
    }

    @Input() col: any;
    @Input() grid: any;

    type: any;
    items: any;

    public filterColumn() {
        let result = [];
        this.grid.displayData.splice(0, this.grid.displayData.length);
        for (var i = 0; i < this.grid.mainData.length; i++) {
            let dataCol=this.grid.mainData[i];
            let flag = true;

            for (var j = 0; j < this.grid.columns.length; j++ ) {
                let filterCol =this.grid.columns[j];
                let a = true;
                let b = true;
                if (filterCol.filterText != undefined && filterCol.filterText != null && filterCol.filterText != "") {
                    if (filterCol.filter.type === 'text')
                    {    
                        a = this.filterData(dataCol, filterCol);
                    }else if (filterCol.filter.type === 'datefield')
                    {    
                        b = this.filterDateTypeData(dataCol, filterCol);
                    }
                }
                if (!a || !b) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                this.grid.displayData.push(JSON.parse(JSON.stringify(dataCol)));
            }
        }
    }

    public filterDateTypeData(row, column) {
        let filterData = column.filterText;
        let key = column.id;
        let columnDate = row[key];
        if (!columnDate || columnDate == null || columnDate === '') {
            return false;
        } else {
            columnDate = CommonUtil.getDateFromString(columnDate);
            let filterDate = CommonUtil.getDateFromString(filterData.year+'-'+filterData.month+'-'+filterData.day);
            if (filterDate.getTime() == columnDate.getTime()) {
                return true;
            } else {
                return false;
            }
        }
        
        // var value = column.filterText;
        // if (!(value instanceof Date) || value == undefined) {
        //     if(value.day && value.month && value.year ){
        //         var dateString = value.year+"-"+value.month+"-"+value.day;
        //         value = new Date(dateString).toISOString;
        //     }else{
        //         return true; 
        //     }
        // }else{
        //     return true;
        // }
        // value.setHours(0, 0, 0, 0);

        // var key = column.id;
        // var columnData = row[key];

        // let cd;
        // if (!(columnData instanceof Date)) {
        //     cd = new Date(columnData);
        // }

        // cd.setHours(0, 0, 0, 0);
        // if (value.getTime() == cd.getTime()) {
        //     return true
        // }
        // return false;
    }


    closeFix(event, datePicker) {
        if (event.target.offsetParent == null)
            datePicker.close();
        else if (event.target.offsetParent.nodeName != "NGB-DATEPICKER")
            datePicker.close();
    }

    public filterData(row, column): boolean {
        let value = column.filterText;
        if (value.trim().length == 0) 
        {
            return true;
        }else {
            value = value.trim().toLowerCase();
            let key = column.id;
            let val = row[key];

            if(typeof val == 'string' && val.toString().trim().toLowerCase().indexOf(value) != -1)
                return true;
            else if(typeof val == 'number' && val.toString().trim().toLowerCase().indexOf(value) != -1)
                return true;
            else if(typeof val == 'boolean' && val.toString().trim().toLowerCase().indexOf(value) != -1)
                return true;
            else
                return false;
        }

        
    }

    public onChange(value) {
        if (value) {
            if (this.col.filter != undefined && this.col.filter.onChange != undefined) {
                this.col.filter.onChange(value, this.grid, this.grid.parent, this.col)
            }
        }
        this.col.filterText = value;
        this.filterColumn();
    }

    clearDate(){
        this.col.filterText = undefined;
        this.filterColumn();
    }

    onExpand(select) {
        if (this.col.filter != undefined && this.col.filter.onExpand != undefined) {
            this.col.filter.onExpand(select, this.grid, this.grid.parent, this.col);
        }
    }

    public clear() {
        this.col.filterText = undefined;
        this.filterColumn();
    }
}