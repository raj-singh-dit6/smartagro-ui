import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared.module";
import { RouterModule } from "@angular/router";
import { TopnavComponent } from "./topnav.component";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { DateRangeModule } from "../daterange/daterange.module";
import { NgbModule } from "../../../../node_modules/@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule,RouterModule,DateRangeModule,NgbModule],
    exports: [TopnavComponent],
    declarations: [TopnavComponent],
    providers: []
  })
  export class TopNavModule { }