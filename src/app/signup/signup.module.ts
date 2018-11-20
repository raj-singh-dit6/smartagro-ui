import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [SignUpComponent
    ],
    exports: [SignUpComponent],
    providers: [],
    entryComponents: []
})

export class SignUpModule { }
