import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MenuComponent } from './menu/menu.component';
import { RecipeComponent } from './recipe/recipe.component';
import { StorageComponent } from './storage/storage.component';

import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VFridgeService } from './vfridge-service';
import { StorageViewComponent } from './storage/storage-view/storage-view.component';
import { RecipeViewComponent } from './recipe/recipe-view/recipe-view.component';
import { RecipeSuggestionComponent } from
'./storage/storage-view/recipe-suggestion/recipe-suggestion.component';
import { AccEditComponent } from './acc-edit/acc-edit.component';
import { FoodWarningComponent } from './food-warning/food-warning.component';
import { BasicAuthInterceptor, ErrorInterceptor, XhrInterceptor } from './auth-interceptor';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';


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
    FoodWarningComponent,
    ShoppinglistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    VFridgeService,
    RecipeComponent,
    {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


