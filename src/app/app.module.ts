import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule, Router, RouterEvent } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeModule } from './shared/daterange/daterange.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { SpinnyModule } from './shared/spinny/spinny.module';
import { AuthService } from './service/auth.service';
import { SpinnyService } from './shared/spinny/spinny.service';
import { SecureHttp } from './shared/secure-http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from './service/user.service';
import { ModulesModule } from './modules/modules.module';
import { AuthGuard } from './shared/guards';
import { SignUpModule } from './signup/signup.module';
import { ToastComponent } from './shared/toast/toast.component';
import { SearchService } from './service/search.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    LoginModule,
    SignUpModule,
    ModulesModule,
    SpinnyModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
    DateRangeModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    SecureHttp,
    AuthGuard,
    UserService,
    ToastrService,
    SpinnyService,
    SearchService
  ],
  bootstrap: [AppComponent],
  entryComponents:[ToastComponent]
})
export class AppModule { 

}
