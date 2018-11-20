import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbTimepickerModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ExtraFunctionsService } from "../../service/extra-functions.service";
import { LoggedInGuard } from "../../shared/guards/logged-in.guard";
import { GridModule } from "../../shared/grid/grid.module";
import { SharedModule } from "../../shared/shared.module";
import { PredictionComponent } from "./prediction.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
        RouterModule,
        GridModule,
        SharedModule,
        NgbModule.forRoot(),
    ],
    providers: [ExtraFunctionsService, LoggedInGuard],
    declarations: [PredictionComponent],
    
    exports: [PredictionComponent],
    entryComponents: []
})

export class PredictionModule{ }