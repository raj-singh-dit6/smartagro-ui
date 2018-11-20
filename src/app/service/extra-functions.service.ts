import * as _ from 'lodash';
import { Subject } from 'rxjs';

export  class ExtraFunctionsService{

    numberOfRecords = new Subject<number>();
    numberOfActiveRecords  = new Subject<number>();
    numberOfInActiveRecords = new Subject<number>();
    removeColumn(columns,id):any{
        var idx;
        _.find( columns, function(col, colIdx){ 
        if(col.id == id){ idx = colIdx; return true;}; 
        });
        if(idx!==undefined)
            return  columns.splice(idx,1) ;
        else
            return columns;    
    }


}