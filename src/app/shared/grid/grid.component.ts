import {
    Component, OnInit, OnChanges, HostListener, Renderer, AfterViewInit, Pipe, PipeTransform, Input,
    SimpleChanges, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';
import * as _ from "lodash";


export class GridExpandableOptions {
    isExpandable: boolean;
    isMultipleExpand: boolean;
    columnId: string;
    component: any;

    constructor(isExpandable = false, isMultipleExpand = true, columnId = "", component = null) {
        this.isExpandable = isExpandable;
        this.isMultipleExpand = isMultipleExpand;
        this.columnId = columnId;
        this.component = component;
    }
}

@Component({
    // moduleId: module.id,
    selector: 'app-grid',
    templateUrl: 'grid.component.html',
    styleUrls: ['grid.component.css']
})
export class GridComponent implements OnInit {

    constructor(private eRef: ElementRef, renderer: Renderer,
        private componentFactory: ComponentFactoryResolver) { }

    @Input()
    public columns = [];
    @Input()
    public parent: any;
    @Input()
    public mainData = [];

    @Input()
    expandable: GridExpandableOptions = new GridExpandableOptions();

    filterColIds: any = [];
    showAll = true;
    groupBy;
    map = {};
    keys = [];
    public displayData = [];

    ngOnInit() {
        this.columns.forEach(col => {
            if (col.searchable) {
                this.filterColIds.push(col.id);
            }
        });
        this.loadData(this.mainData);
    }

    public groupByGrid(groupBy, showAll?): number {
        this.showAll = showAll;
        this.groupBy = groupBy;
        let show = true;

        this.map = {};
        this.keys = [];
        this.mainData.forEach((element) => {

            var groupValue = element[this.groupBy.id];
            if (!(groupValue instanceof Array)) {
                groupValue = [];
                groupValue.push(element[this.groupBy.id]);
            }

            groupValue.forEach((obj) => {
                let data = this.map[obj];
                if (data == undefined) {
                    data = [];
                    this.map[obj] = {};
                    this.keys.push(obj);
                } else {
                    data = this.map[obj].data;
                }
                data.push(element);
                this.map[obj].show = show;
                this.map[obj].data = data;
            });

        });
        return this.keys.length;
    }

    toggle(key) {
        this.map[key].show = !this.map[key].show;
    }


    public loadData(data) {
        this.clearFilter(this.filterColIds);
        this.displayData = JSON.parse(JSON.stringify(data));
    }

    public clearFilter(filterColIds) {
        this.columns.forEach(col => {
            if (col.filterText != undefined && filterColIds.indexOf(col.id) != -1) {
                col.filterText = undefined;
            }
        });
    }

}