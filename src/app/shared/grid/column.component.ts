import { Component, OnInit, Pipe, PipeTransform, Input } from '@angular/core';

@Component({
    selector: 'app-grid-column',
    templateUrl: 'column.component.html',
})

export class ColumnComponent implements OnInit {

    constructor() { }

    @Input() col: any;
    @Input() record: any;
    @Input() rowNumber;
    @Input() grid: any;

    ngOnInit(): void {
        
        this.col.type = this.col.type == undefined ? 'text' : this.col.type;
    }
}