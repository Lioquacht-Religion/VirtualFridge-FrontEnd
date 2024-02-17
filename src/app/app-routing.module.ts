import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { StorageComponent } from './storage/storage.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeViewComponent } from './recipe/recipe-view/recipe-view.component';
import { StorageViewComponent } from './storage/storage-view/storage-view.component';
import { RecipeSuggestionComponent } from './storage/storage-view/recipe-suggestion/recipe-suggestion.component';
import { AccEditComponent } from './acc-edit/acc-edit.component';
import { FoodWarningComponent } from './food-warning/food-warning.component';
import { ShoppinglistComponent } from './shopping-list/shopping-list.component';
import { ShoppingListViewComponent } from './shopping-list/shopping-list-view/shopping-list-view.component';

import { FoodCreationComponent } from './food-creation/food-creation.component';
import { Storagev2Component } from './storagev2/storagev2.component';
import { Storagev2FoodViewComponent } from './storagev2/storagev2-food-view/storagev2-food-view.component';


const routes: Routes = [

  { path: 'link_register', component: RegisterComponent},
  { path: 'link_login', component: LoginComponent},
  { path: 'link_menu', component: MenuComponent},
  { path: 'link_storage/:userID', component: StorageComponent},
  { path: 'link_recipe/:userID', component: RecipeComponent },
  { path: 'link_storageview/:storageID/:storageName', component: StorageViewComponent },
  { path: 'link_recipeview/:recipeID/:recipeName', component: RecipeViewComponent },
  {path: 'link_recipesuggestion/:storageID' , component: RecipeSuggestionComponent },
  {path: 'link_food-warning' , component: FoodWarningComponent },
  {path: 'link_acc-edit' , component : AccEditComponent},
  {path: 'link_shopping-list/:userID' , component : ShoppinglistComponent},
  {path: 'link_shopping-list-view/:shoppingListID/:shoppingListName' , component : ShoppingListViewComponent},

  {path: 'link_foodcreation' , component : FoodCreationComponent},
  {path: 'link_storagev2/:userID' , component : Storagev2Component},
  {path: 'link_storagev2-view/:storagev2ID/:storagev2Name' , component : Storagev2FoodViewComponent}
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
