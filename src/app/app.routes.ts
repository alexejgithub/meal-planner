import { Routes } from '@angular/router';
import { MealViewerComponent } from './meal-viewer/meal-viewer.component';
import * as wk1Meal from "./plans/mealswk1.json"
import * as wk2Meal from "./plans/mealswk2.json"
import * as wk3Meal from "./plans/mealswk3.json"
import * as wk4Meal from "./plans/mealswk4.json"
import * as wk5Meal from "./plans/mealswk5.json"
import * as wk6Meal from "./plans/mealswk6.json"

export const routes: Routes = [
    { path: '', component: MealViewerComponent, data: { meals: wk1Meal, title: "Woche 1" } },
    { path: 'week1', component: MealViewerComponent, data: { meals: wk1Meal, title: "Woche 1" } },
    { path: 'week2', component: MealViewerComponent, data: { meals: wk2Meal, title: "Woche 2" } },
    { path: 'week3', component: MealViewerComponent, data: { meals: wk3Meal, title: "Woche 3" } },
    { path: 'week4', component: MealViewerComponent, data: { meals: wk4Meal, title: "Woche 4" } },
    { path: 'week5', component: MealViewerComponent, data: { meals: wk5Meal, title: "Woche 5" } },
    { path: 'week6', component: MealViewerComponent, data: { meals: wk6Meal, title: "Woche 6" } },

];
