import { Component, Input, OnInit, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

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
  order:Number;
}

@Component({
  selector: 'app-meal-viewer',
  imports: [CommonModule,MatListModule,MatSlideToggleModule,MatCardModule, MatToolbarModule, MatButtonModule],
  templateUrl: './meal-viewer.component.html',
  styleUrl: './meal-viewer.component.scss'
})

export class MealViewerComponent implements OnInit{

  //title = 'MealPlan';
  cards = signal<CardContent[]>([]);
  ingredients = signal<Ingredient[]>([]);
  @Input() meals:any; // decorate the property with @Input()
  @Input() title?:string 
  header? = "default";
  constructor() {

  }

  ngOnInit(){
    const cards: CardContent[] = [];
    const ingredients: Ingredient[] = [];
    this.header = this.title;
    this.meals.meals.forEach((meal: { Title: any; Description: any; Image: any; RecipeURL: any; Ingredients: any[]; }) => {
      cards.push({
        title: `${meal.Title}`,
        description: `${meal.Description}`,
        imageUrl: `${meal.Image}`,
        recipeURL:`${meal.RecipeURL}`
      });
      meal.Ingredients.forEach((ing: { Name: any; Unit: any; Amount: any; Order:Number}) => {
        ingredients.push({
          name:`${ing.Name}`,
          unit:`${ing.Unit}`,
          amount:`${ing.Amount}`,
          order:ing.Order
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
        const tmpIngredient : Ingredient = {name:ing.name,amount:String(tmpAmount),unit:ing.unit,order:ing.order}
        ingMap.set(ing.name,tmpIngredient); 
      }else{
        ingMap.set(ing.name,ing);
      }
    });
    const result:Ingredient[] = [];
    ingMap.forEach((v,k)=>{
      result.push(v);
    })
    result.sort((a,b)=>{return a.order<=b.order?-1:1})
    this.ingredients.set(result)

  }

}
