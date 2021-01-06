import { NgModule } from '@angular/core';
import { ShoopingListComponent } from './shooping-list.component';
import { ShoopingEditComponent } from './shooping-edit/shooping-edit.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShoopingListComponent, ShoopingEditComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShoopingListComponent }]),
    SharedModule,
  ],
})
export class ShoppingListModule {}
