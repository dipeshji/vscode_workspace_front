import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { ingredient } from "../Shared/Ingredint.model";
import { ShoppingListService } from "./shopping-list.service";
import * as shoppingListActions from "./store/shopping-list.actions";
import * as fromApp from '../store/app.reducer';

@Component({
  selector: "app-shooping-list",
  templateUrl: "./shooping-list.component.html",
  styleUrls: ["./shooping-list.component.css"],
})
export class ShoopingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: ingredient[] }>; //ingredients is an array of observables.
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}
  // { ingredients: ingredient[] } data format of store. This mean we have an object with ingredients which is of type ingredient array
  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEdit(index: number) {
    // this.slService.editStarted.next(index);
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
