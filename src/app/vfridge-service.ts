import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Shoppinglist } from './shoppinglist';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Accept' : 'application/json',
        //'Authorization' : 'Basic'
    })
}

export interface User {
  name : string;
  email : string;
  password : string;
  id : number;
}

@Injectable()
export class VFridgeService {

  base_api : string  =
    //"https://localhost:8080/api/v1.0";
    "https://45.129.46.25:8080/api/v1.0";
  public user : User = {
    name : "",
    email : "",
    password : "",
    id : 0
  };
  public userLogined: boolean = false;

  public showLogin : boolean = true;

    constructor(private http:HttpClient) {
      this.userLogined = true; //('true' === localStorage.getItem('login_token'));
      //var uemail: any = localStorage.getItem("user");

      /*this.getUserAuthenticated().subscribe(
        data => {
          if(data == true){
            this.userLogined = true;
            localStorage.setItem('login_token', 'true');
          }
        },
        err => console.log(err),
        () => {console.log('loading done.'+this.user.email);

      } );*/
    }


  encryptSecretKey = 'dffsdfs@fdsf';
  encryptData(data : any){
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
  }


    getAuthenticationHeaders() : HttpHeaders{
      /*const token : string = btoa(
        this.encryptData(this.user.email) + ':' + this.encryptData(this.user.password)
      );*/
      const token = window.btoa(this.user.email + ':' + this.user.password);
      console.log(token);

        //Buffer.from(this.user.email + ':' + this.user.password, 'utf8')

      const headers = new HttpHeaders( {
            'Authorization': 'Basic ' + window.btoa(this.user.email + ':' + this.user.password),
            'Content-Type' : 'application/json'
      });


      return headers;
    }

    getLogedCurUser(){
      return this.user;
    }

    getStorageData(l_userID: number) {
        return this.http.get(this.base_api + '/user/storage/all?OwnerID=' + l_userID);
    }

    //TODO: replace with user authentication method of som kind
    getUserData(l_email: String) {
      return this.http.get(this.base_api + '/user/email?email=' + l_email);
  }

  getUserAuthenticated() //: Observable<boolean>
  {
    console.log(this.user);
    let email = this.user.email;
    let password = this.user.password;
    console.log(this.getAuthenticationHeaders());

    let req = this.http.get(this.base_api + '/user/authenticated',
                                     //{email, password},
    {headers : this.getAuthenticationHeaders()});
    console.log(req);

    return req;
  }

  getUserFetch(){

    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.base_api + '/user/authenticated', true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization",
                         'Basic ' + window.btoa(this.user.email + ':' + this.user.password));
    xhr.send();

    console.log(xhr.response);


    let resp;
    fetch(this.base_api + '/user/authenticated',
          {
     method: "GET",
     headers: {
         'Authorization' : 'Basic ' + window.btoa(this.user.email + ':' + this.user.password)
     }
    })
  .then(response => resp = response);
  console.log(resp);
  return resp;

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
      return this.http.get(this.base_api + '/recipe/all');
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

    addGroceryData(postGrocery: Object, storageID: number){
          let endPoint =
          this.base_api+"/grocery/byID?storageID=" + storageID;
          return this.http.post(endPoint, postGrocery);
          /*.subscribe(data => {
            console.log(data);
          });*/
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

      addRegisterData(userdata: User) {
        let endPoint =
        this.base_api+"/user/register";
        this.http.post(endPoint, userdata).subscribe(data => {
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

      createShoppinglist(l_shoppinglistname: string) {
        return this.http.post(this.base_api + '/shoppinglist/add', l_shoppinglistname);
    }
      updateShoppinglist(l_userID: number, l_shoppinglistID: number, l_listupdate: Shoppinglist) {
      return this.http.put(this.base_api + '/shoppinglist?userID=' + l_userID+ '&listID=' +  l_shoppinglistID, l_listupdate);
   }
      deleteShoppinglist(l_userID: number, l_shoppinglistID: number) {
        return this.http.delete(this.base_api + '/shoppinglist?userID=' + l_userID + '&listID=' +  l_shoppinglistID);
    }
      getShoppinglist(l_userID: number) {
        return this.http.get(this.base_api + '/shoppinglist/all?userID=' + l_userID);
    }

      getShoppinglistItems() {
      return this.http.get(this.base_api + '/shoppinglist/item/all');
    }
    
    addShoppinglistItem(postShoppinglistItem: Object) {
      return this.http.post(this.base_api + '/shoppinglist/item/add', postShoppinglistItem);
    }

}
