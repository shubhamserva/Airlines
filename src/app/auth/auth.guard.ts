import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {map} from 'rxjs/operators'
import {State } from '../appStore/Reducers/auth.reducers'

@Injectable({providedIn: 'root'})
export class authGuard implements CanActivate{

    constructor(
        private store: Store<{ auth: { states: State } }>,
        private router:Router
    ){}

    canActivate(
         route: ActivatedRouteSnapshot,
         router: RouterStateSnapshot
         ): boolean | Promise<boolean> | Observable<boolean> {

            
             return this.store.select('auth').pipe(map(userData =>{
                 console.log("USR DATA is",userData);
                 if(userData == undefined){
                    this.router.navigate(['/']);
                     return false;
                 }
                 else return true;
             }));


         }
}