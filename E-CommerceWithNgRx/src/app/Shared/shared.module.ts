import { NgModule } from "@angular/core";
import { AlertComponent } from './alert/alert.component'
import { LoadingSpinnerComponent } from './loadding-sppiner/loadding-spinner.component';
import { PlaceHolderDirective } from './place/placeholder.directive';
import { DropdownDirective } from './dropedown.directive'
import { CommonModule } from "@angular/common";
 
@NgModule({
  declarations:[
      AlertComponent,
      LoadingSpinnerComponent,
      PlaceHolderDirective,
      DropdownDirective
  ],
  imports:[
      CommonModule
  ],
  exports:[
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    DropdownDirective,
    CommonModule
  ],
  entryComponents:[
      AlertComponent
  ]
})
export class SharedModule{

}