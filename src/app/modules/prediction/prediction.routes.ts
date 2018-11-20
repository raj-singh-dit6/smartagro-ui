import { Route } from "@angular/router";
import { PredictionComponent } from "./prediction.component";

export const PredictionRoutes: Route[] = [
    {
        path: 'prediction', 
        component: PredictionComponent, 
        //canActivate: [LoggedInGuard],
        children: [
        ]
    }
];
