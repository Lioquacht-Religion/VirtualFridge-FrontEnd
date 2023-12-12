import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable()
export class VFridgeService {
  base_api : string  = "http://localhost:8080/api/v1.0";
  public user : any;
  public userLogined: boolean = false;
    constructor(private http:HttpClient) {
      this.userLogined = true; //('true' === localStorage.getItem('login_token'));
      var uemail: any = localStorage.getItem("user");

      this.getUserData(uemail).subscribe(
        data => { this.user = data; },
        err => console.log(err),
        () => {console.log('loading done.'+this.user);

      } );
    }
    getAuthorization(){
 const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'baystmuv-vi-1.0 os=ios, key=9d9e8972-ff15-4943-8fea-117b5a973c61',
  }),
 };
 return httpOptions;
 }
    getFoodWarningData(){
      let external_api = "https://megov.bayern.de/verbraucherschutz/baystmuv-verbraucherinfo/rest/api/warnings/merged";
      return this.http.get(external_api, this.getAuthorization());
    }

    getLogedCurUser(){
      return this.user;
    }

    getStorageData(l_userID: number) {
        return this.http.get(this.base_api + '/user/storage/all?OwnerID=' + l_userID);
    }

    getUserData(l_email: String) {
      return this.http.get(this.base_api + '/user/email?email=' + l_email);
  }

  putUserData(putUser: object){
    let endPoint =
    this.base_api + "/user";
    return this.http.put(endPoint, putUser);

  }

  deleteUserData() {
    let endPoint =
    this.base_api + "/user?userID="
    + this.user.id + "&email=" + this.user.email + "&password=" + this.user.password;
    this.http.delete(endPoint).subscribe(data => {
      console.log(data);
    });
  }

    getGroceryData(l_storageID: number) {
      return this.http.get(this.base_api + '/storage/grocery/byID/all?storageID='+l_storageID);
    }

    getRecipeData(l_userID: number) {
      return this.http.get(this.base_api + '/recipe/all?userID='+l_userID);
    }

    getSingleRecipeData(l_recipeID: number) {
      return this.http.get(this.base_api + '/recipe/byID?recipeID='+l_recipeID);
    }

    getIngredientData(l_recipeID: number) {
      return this.http.get(this.base_api+'/recipe/ingredient/all?recipeID='+l_recipeID);
    }

    addStorageData(postStorage: Object) {
        let endPoint =
        this.base_api+"/storage";
        return this.http.post(endPoint, postStorage);
      }

      async addGroceryData(postGrocery: Object, storageID: number): Promise<void> {
          let endPoint =
          this.base_api+"/grocery/byID?storageID=" + storageID;
          this.http.post(endPoint, postGrocery).subscribe(data => {
            console.log(data);
          });
      }

      addRecipeData(postRecipe: Object, userID: number) {
        let endPoint =
        this.base_api+"/recipe?OwnerID=" + userID;
        return this.http.post(endPoint, postRecipe);
      }

      putRecipeData(putRecipe: Object) {
        let endPoint =
        this.base_api+"/recipe";
        this.http.put(endPoint, putRecipe).subscribe(data => {
          console.log(data);
        });
      }

      addIngredientData(postIngredient: Object, ingredientID: number) {
        let endPoint =
        this.base_api+"/recipe/ingredient?RecipeID=" + ingredientID;
        return this.http.post(endPoint, postIngredient);
      }

      addRegisterData(postTask: Object) {
        let endPoint =
        this.base_api+"/user";// +
        //"?storName=" + storname +
        //"&" + uemail;
        this.http.post(endPoint, postTask).subscribe(data => {
          console.log(data);
        });
      }

    deleteStorage(userID: number, storageID: number) {
        let endPoint =
        this.base_api+"/storage" +
        "?userID=" + userID +
        "&storageID=" + storageID;
       return  this.http.delete(endPoint);
      }

      deleteGrocery(storageID: number, groceryID: number) {
        let endPoint =
        this.base_api + "/grocery" +
        "?storageID=" + storageID +
        "&groceryID=" + groceryID;
        return this.http.delete(endPoint);
      }

      deleteRecipe(userID: number, recipeID: number) {
        let endPoint =
        this.base_api+"/recipe" +
        "?userID=" + userID +
        "&recipeID=" + recipeID;
        return this.http.delete(endPoint);
      }
      deleteIngredient(recipeID: number, ingredientID: number) {
        let endPoint =
        this.base_api+"/ingredient" +
        "?recipeID=" + recipeID +
        "&ingredientID=" + ingredientID;
        return this.http.delete(endPoint);
      }
      getRecSugData(l_userID: number, l_storageID: number) {
        return this.http.get(this.base_api+'/storage/recipe/suggestion?userID='+
        l_userID +'&storageID='+l_storageID);
      }
}
