import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';

import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import * as meals from "./mealswk1.json"
type CardContent = {
  title: string;
  description: string;
  imageUrl: string;
  recipeURL:string;
};

type Ingredient={
  name:string;
  amount:string;
  unit:string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatListModule,CommonModule,MatSlideToggleModule,MatCardModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})




export class AppComponent {
  
  title = 'MealPlan';
  cards = signal<CardContent[]>([]);
  ingredients = signal<Ingredient[]>([]);

  constructor() {
    const cards: CardContent[] = [];
    const ingredients: Ingredient[] = [];

    meals.meals.forEach(meal => {
      cards.push({
        title: `${meal.Title}`,
        description: `${meal.Description}`,
        imageUrl: `${meal.Image}`,
        recipeURL:`${meal.RecipeURL}`
      });
      meal.Ingredients.forEach(ing => {
        ingredients.push({
          name:`${ing.Name}`,
          unit:`${ing.Unit}`,
          amount:`${ing.Amount}`,
        });
      });
    });
    this.summarizeIngredients(ingredients);
    this.cards.set(cards);
  }
   summarizeIngredients = (ingredients:Ingredient[])=>{
    const ingMap :Map<string,Ingredient> = new Map();
    ingredients.forEach(ing => {
      if(ingMap.has(ing.name)){
        const tmpAmount = Number(ingMap.get(ing.name)?.amount)+Number(ing.amount)
        const tmpIngredient : Ingredient = {name:ing.name,amount:String(tmpAmount),unit:ing.unit}
        ingMap.set(ing.name,tmpIngredient); 
      }else{
        ingMap.set(ing.name,ing);

      }
    });
    const result:Ingredient[] = [];
    ingMap.forEach((v,k)=>{
      result.push(v);
    })
    this.ingredients.set(result)

  }

}
