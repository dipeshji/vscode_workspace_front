/*
 * ofType is a filter which filters type of action
 * $ after action is applied because it's a observable. But not compulsary to.
 * switchMap allows us to create new observable by taking another observable data.
 * A effect must return a action at last, because it dosen't change any state it just exectues some logic.
 */

import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

import * as AuthActions from "./auth.actions";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      console.log("in effects");

      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2wdxNCyXMV5G8xg1TaCrqrOp5sFMAs2Q",
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          //order of operators matters in pipe. if we put map after catchError it will throw error.
          map((resData) => {
            //map will be exicuted when there will be no error
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            console.log(resData);

            //action here will dispatch automatically, @ngrx/effects will do it for us.
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorRes) => {
            //catchError needs to return non error observable else the switch map obsevable will die
            let errorMessage = "An unknown error occured!";
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.LoginFail(errorMessage));
            }
            switch (errorRes.error.error.message) {
              case "EMAIL_EXISTS":
                errorMessage = "This email already exists!";
                break;
              case "EMAIL_NOT_FOUND":
                errorMessage = "This email does not exist!";
                break;
              case "INVALID_PASSWORD":
                errorMessage = "This password is incorrect!";
            }

            return of(new AuthActions.LoginFail(errorMessage)); //of is a utility function which gives new error free observable
          })
        );
    })
  ); //actions$ is an observable but don't subscribe it. NgRx effects will subscribe for you.

  @Effect({ dispatch: false })
  //dispatch set to false here inform ngrx that this effect will not dispatch any action at last
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      console.log("login effect");

      this.router.navigate(["/"]);
    })
  );

  // @Effect({ dispatch: false })
  // authLogout = this.actions$.pipe(
  //   ofType(AuthActions.LOGOUT),
  //   map(() => {
  //     console.log("logout effect");
  //   })
  // );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
