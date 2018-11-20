import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [LoginComponent,ToastComponent],
  exports: [LoginComponent],
  providers: [],
  entryComponents: [ToastComponent]
})

export class LoginModule { }
