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
import { ShoppinglistComponent } from './shopping-list/shopping-list.component';
import { ShoppingListViewComponent } from './shopping-list/shopping-list-view/shopping-list-view.component';
import { Storagev2Component } from './storagev2/storagev2.component';
import { FoodCreationComponent } from './food-creation/food-creation.component';
import { Storagev2FoodViewComponent } from './storagev2/storagev2-food-view/storagev2-food-view.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


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
    ShoppinglistComponent,
    ShoppingListViewComponent,
    Storagev2Component,
    FoodCreationComponent,
    Storagev2FoodViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ZXingScannerModule
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


