import { NgModule } from '@angular/core';
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

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VFridgeService } from './vfridge-service';


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
    StorageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [VFridgeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
