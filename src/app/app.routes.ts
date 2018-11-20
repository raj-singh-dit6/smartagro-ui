import { LoginComponent } from "./login/login.component";
import { Routes } from "@angular/router";
import { ModulesRoutes } from "./modules/modules.routes";
import { SignUpRoutes } from './signup/signup.routes';
import { LoginRoutes } from "./login/login.routes";
import { PredictionRoutes } from "./modules/prediction/prediction.routes";

export const routes: Routes = [
  ...LoginRoutes,
  ...ModulesRoutes,
  ...SignUpRoutes ,
  { path: '**', component: LoginComponent }
];
