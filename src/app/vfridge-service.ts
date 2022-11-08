import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable()
export class VFridgeService {
  public user : any;
  public userLogined: boolean = false;
    constructor(private http:HttpClient) {
      this.userLogined = ('true' === localStorage.getItem('login_token'));
      var uemail: any = localStorage.getItem("user");

      this.getUserData(uemail).subscribe(
        data => { this.user = data; },
        err => console.log(err),
        () => {console.log('loading done.'+this.user);
        
      } );
    }

    getLogedCurUser(){
      return this.user;
    }

    getStorageData(l_userID: number) {
        return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/user/storage/all?OwnerID=' + l_userID);
    }

    getUserData(l_email: String) {
      return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/user/email?email=' + l_email);
  }

  putUserData(putUser: object){
    let endPoint = 
    "https://virtual-fridge.herokuapp.com/api/v1.0/user";
    return this.http.put(endPoint, putUser);

  }

  deleteUserData() {
    let endPoint = 
    "https://virtual-fridge.herokuapp.com/api/v1.0/user?userID=" 
    + this.user.id + "&email=" + this.user.email + "&password=" + this.user.password;
    this.http.delete(endPoint).subscribe(data => {
      console.log(data);
    });
  }

    getGroceryData(l_storageID: number) {
      return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/storage/grocery/byID/all?storageID='+l_storageID);
    }

    getRecipeData(l_userID: number) {
      return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/recipe/all?userID='+l_userID);
    }

    getSingleRecipeData(l_recipeID: number) {
      return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/recipe/byID?recipeID='+l_recipeID);
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

      async addGroceryData(postGrocery: Object, storageID: number): Promise<void> {
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

      putRecipeData(putRecipe: Object) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/recipe";
        this.http.put(endPoint, putRecipe).subscribe(data => {
          console.log(data);
        });
      }

      addIngredientData(postIngredient: Object, ingredientID: number) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/recipe/ingredient?RecipeID=" + ingredientID;
        this.http.post(endPoint, postIngredient).subscribe(data => {
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
      deleteIngredient(recipeID: number, ingredientID: number) {
        let endPoint = 
        "https://virtual-fridge.herokuapp.com/api/v1.0/ingredient" +
        "?recipeID=" + recipeID + 
        "&ingredientID=" + ingredientID;
        this.http.delete(endPoint).subscribe(data => {
          console.log(data);
        });
      }
      getRecSugData(l_userID: number, l_storageID: number) {
        return this.http.get('https://virtual-fridge.herokuapp.com/api/v1.0/storage/recipe/suggestion?userID='+ 
        l_userID +'&storageID='+l_storageID);
      }
}
