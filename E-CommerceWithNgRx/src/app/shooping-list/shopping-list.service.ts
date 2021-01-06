import { Subject } from 'rxjs';
import { ingredient } from '../Shared/Ingredint.model'

export class ShoppingListService {

    ingredientsChanged = new Subject<ingredient[]>();
    editStarted = new Subject<number>();
    private ingredients: ingredient[] = [
        new ingredient("Apples", 5),
        new ingredient("Mangoes", 20)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index]
    }

    addIngredient(ing: ingredient) {
        this.ingredients.push(ing);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}