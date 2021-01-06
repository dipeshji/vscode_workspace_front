import { ingredient } from '../Shared/Ingredint.model';

export class Recipe {
    constructor(
        public name: string,
        public discription: string,
        public imagePath: string,
        public ingredients: ingredient[]
    ) {
        this.name = name;
        this.discription = discription;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}