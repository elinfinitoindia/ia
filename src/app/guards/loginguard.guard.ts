import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    // console.log(localStorage.getItem("Login"));
    // if (localStorage.getItem("Login") == "true") {
    //   return false;
    //  }
    //  else {
    //   this.router.navigate(["/login"]);
    //   return true;
    // }  
    return true;
  }
  }