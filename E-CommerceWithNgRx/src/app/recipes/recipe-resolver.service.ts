import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../Shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService, private RecipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, State: RouterStateSnapshot) {
        const recipes = this.RecipeService.getRecipes();
        if (recipes.length === 0)
            return this.dataStorageService.fetchRecipe();
        else
            return recipes;
    }
}