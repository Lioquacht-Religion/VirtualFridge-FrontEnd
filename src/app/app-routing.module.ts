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
import { AppComponent } from './app.component';


const routes: Routes = [

  { path: 'link_register', component: RegisterComponent, outlet: 'login' },
  { path: 'link_login', component: LoginComponent, outlet: 'login'},
  { path: 'link_menu', component: MenuComponent, outlet: 'app' },
  { path: 'link_storage/:userID', component: StorageComponent, outlet: 'app' },
  { path: 'link_recipe/:userID', component: RecipeComponent },
  { path: 'link_storageview/:storageID/:storageName', component: StorageViewComponent },
  { path: 'link_recipeview/:recipeID/:recipeName', component: RecipeViewComponent },
  {path: 'link_recipesuggestion/:storageID' , component: RecipeSuggestionComponent },
  {path: 'link_food-warning' , component: FoodWarningComponent },
  {path: 'link_acc-edit' , component : AccEditComponent}/*,
  {
    path: 'approot',
    component: AppComponent,
    children: [
      {
        path: 'link_login',
        component: LoginComponent,
        outlet: 'login'
      }
    ]
  }*/
];

const routes2: Routes =[
  {
    path: '',
    component: AppComponent,
    children: [

{ path: 'link_register', component: RegisterComponent, outlet: 'login' },
  { path: 'link_login', component: LoginComponent, outlet: 'login'}

    ]
  },
{
    path: 'link_app',
    component: AppComponent,
    outlet: 'app',
    children: [

{ path: 'link_menu', component: MenuComponent, outlet: 'app' },
  { path: 'link_storage/:userID', component: StorageComponent, outlet: 'app' },
  { path: 'link_recipe/:userID', component: RecipeComponent },
  { path: 'link_storageview/:storageID/:storageName', component: StorageViewComponent },
  { path: 'link_recipeview/:recipeID/:recipeName', component: RecipeViewComponent },
  {path: 'link_recipesuggestion/:storageID' , component: RecipeSuggestionComponent },
  {path: 'link_food-warning' , component: FoodWarningComponent },
  {path: 'link_acc-edit' , component : AccEditComponent}

    ]
  },
{ path: 'link_menu', component: MenuComponent },
  { path: 'link_storage/:userID', component: StorageComponent, outlet: 'app' },
  { path: 'link_recipe/:userID', component: RecipeComponent },
  { path: 'link_storageview/:storageID/:storageName', component: StorageViewComponent },
  { path: 'link_recipeview/:recipeID/:recipeName', component: RecipeViewComponent },
  {path: 'link_recipesuggestion/:storageID' , component: RecipeSuggestionComponent },
  {path: 'link_food-warning' , component: FoodWarningComponent },
  {path: 'link_acc-edit' , component : AccEditComponent}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes2)
    //RouterModule.forChild(routes2)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
