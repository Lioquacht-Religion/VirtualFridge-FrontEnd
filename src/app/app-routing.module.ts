import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { StorageComponent } from './storage/storage.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { StorageViewComponent } from './storage-view/storage-view.component';


const routes: Routes = [

  { path: 'link_register', component: RegisterComponent },
  { path: 'link_login', component: LoginComponent },
  { path: 'link_menu', component: MenuComponent },
  { path: 'link_storage', component: StorageComponent },
  { path: 'link_recipe', component: RecipeComponent },
  { path: 'link_storageview', component: StorageViewComponent },
  { path: 'link_recipeview', component: RecipeViewComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
