import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { ingredient } from "../Shared/Ingredint.model";
import { ShoppingListService } from "../shooping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as shoppingListActions from "../shooping-list/store/shopping-list.actions";
import * as fromShoppingList from "../shooping-list/store/shopping-list.reducer";

@Injectable()
export class RecipeService {
  recipesChanded = new Subject<Recipe[]>();

  private recipes: Recipe[];
  // = [
  //     new Recipe(
  //         "Sev tamatar",
  //         "It's a Test Recipe",
  //         "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg",
  //         [
  //             new ingredient('chilly', 1),
  //             new ingredient('onion', 1)
  //         ]
  //     ),
  //     new Recipe(
  //         "Sahi Paneer",
  //         "It's another Test Recipe",
  //         "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg",
  //         [
  //             new ingredient('paneer', 10),
  //             new ingredient('masala', 2)
  //         ]
  //     )
  // ];

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanded.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index) {
    return this.recipes[index];
  }

  addIngredientsToShoopingList(ingredients: ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanded.next(this.recipes.slice());
  }

  updateRecipe(index: number, updateRecipe: Recipe) {
    this.recipes[index] = updateRecipe;
    this.recipesChanded.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanded.next(this.recipes.slice());
  }
}
