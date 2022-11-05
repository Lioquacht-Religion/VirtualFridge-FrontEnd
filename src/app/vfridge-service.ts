import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable()
export class VFridgeService {
    constructor(private http:HttpClient) {}

    getStorageData(l_userID: number) {
        return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/user/storage/all?OwnerID=' + l_userID);
    }

    getUserData(l_email: String) {
      return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/user/email?email=' + l_email);
  }

    getGroceryData(l_storageID: number) {
      return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/storage/grocery/byID/all?storageID='+l_storageID);
    }

    getRecipeData(l_userID: number) {
      return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/recipe/all?userID='+l_userID);
    }

    getIngredientData(l_recipeID: number) {
      return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/recipe/ingredient/all?recipeID='+l_recipeID);
    }

    addStorageData(postStorage: Object) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/storage";
        this.http.post(endPoint, postStorage).subscribe(data => {
          console.log(data);
        });
      }

      addGroceryData(postGrocery: Object, storageID: number) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/grocery/byID?storageID=" + storageID;
        this.http.post(endPoint, postGrocery).subscribe(data => {
          console.log(data);
        });
      }

      addRecipeData(postRecipe: Object, userID: number) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/recipe?OwnerID=" + userID;
        this.http.post(endPoint, postRecipe).subscribe(data => {
          console.log(data);
        });
      }

      addIngredientData(postRecipe: Object, ingredientID: number) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/recipe?OwnerID=" + ingredientID;
        this.http.post(endPoint, postRecipe).subscribe(data => {
          console.log(data);
        });
      }

      addRegisterData(postTask: Object) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/user";// +
        //"?storName=" + storname + 
        //"&" + uemail;
        this.http.post(endPoint, postTask).subscribe(data => {
          console.log(data);
        });
      }

    deleteStorage(userID: number, storageID: number) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/storage" +
        "?userID=" + userID + 
        "&storageID=" + storageID;
        this.http.delete(endPoint).subscribe(data => {
          console.log(data);
        });
      }

      deleteGrocery(storageID: number, groceryID: number) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/grocery" +
        "?storageID=" + storageID + 
        "&groceryID=" + groceryID;
        this.http.delete(endPoint).subscribe(data => {
          console.log(data);
        });
      }

      deleteRecipe(userID: number, recipeID: number) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/recipe" +
        "?userID=" + userID + 
        "&recipeID=" + recipeID;
        this.http.delete(endPoint).subscribe(data => {
          console.log(data);
        });
      }
}
