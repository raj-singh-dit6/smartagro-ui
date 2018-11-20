import { Route } from '@angular/router';

import { LoggedInGuard } from '../shared/guards/logged-in.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutes } from './dashboard/dashboard.routes';
import { ModulesComponent } from './modules.component';
import { PredictionRoutes } from './prediction/prediction.routes';
export const ModulesRoutes: Route[] = [
    {
        path: 'smartagro',
        component: ModulesComponent,
        children: [
            ...DashboardRoutes,
            ...PredictionRoutes,
            
        ]
    }
];
