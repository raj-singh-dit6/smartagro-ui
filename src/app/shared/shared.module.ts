import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableTableDirective } from './directives/sort-table.directive';
import { YoutubeListComponent } from './youtube-list/youtube-list.component';
import { SafePipe } from './pipes/safepipe';



@NgModule({
    imports: [CommonModule, FormsModule, NgbModule],
    declarations: [
      SortableTableDirective,
      YoutubeListComponent,
      SafePipe
    ],
    exports: [
      SortableTableDirective,
      YoutubeListComponent,
      SafePipe
    ],
    providers: []
})
export class SharedModule {
}
