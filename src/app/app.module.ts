import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MenuComponent } from './menu/menu.component';
import { RecipeComponent } from './recipe/recipe.component';
import { StorageComponent } from './storage/storage.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VFridgeService } from './vfridge-service';
import { StorageViewComponent } from './storage/storage-view/storage-view.component';
import { RecipeViewComponent } from './recipe/recipe-view/recipe-view.component';
import { RecipeSuggestionComponent } from
'./storage/storage-view/recipe-suggestion/recipe-suggestion.component';
import { AccEditComponent } from './acc-edit/acc-edit.component';
import { FoodWarningComponent } from './food-warning/food-warning.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    MenuComponent,
    RecipeComponent,
    StorageComponent,
    StorageViewComponent,
    RecipeViewComponent,
    RecipeSuggestionComponent,
    AccEditComponent,
    FoodWarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [VFridgeService, RecipeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
