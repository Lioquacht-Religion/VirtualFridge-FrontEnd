import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { StorageComponent } from './storage/storage.component';
import { RecipeComponent } from './recipe/recipe.component';


const routes: Routes = [

  { path: 'link_register', component: RegisterComponent },
  { path: 'link_login', component: LoginComponent },
  { path: 'link_menu', component: MenuComponent },
  { path: 'link_storage', component: StorageComponent },
  { path: 'link_recipe', component: RecipeComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
