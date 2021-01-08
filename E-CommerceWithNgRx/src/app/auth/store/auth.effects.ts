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
import { User } from "../user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem("userData", JSON.stringify(user));
  //action here will dispatch automatically, @ngrx/effects will do it for us.
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
  });
};
const handleError = (errorRes: any) => {
  let errorMessage = "An unknown error occured!";
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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

  return of(new AuthActions.AuthenticateFail(errorMessage)); //of is a utility function which gives new error free observable
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_SATRT),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      console.log(signupAction);

      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2wdxNCyXMV5G8xg1TaCrqrOp5sFMAs2Q",
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          //order of operators matters in pipe. if we put map after catchError it will throw error.
          map((resData) => {
            //map will be exicuted when there will be no error
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            //catchError needs to return non error observable else the switch map obsevable will die
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      console.log(authData);

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
            //action here will dispatch automatically, @ngrx/effects will do it for us.
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            //catchError needs to return non error observable else the switch map obsevable will die
            return handleError(errorRes);
          })
        );
    })
  ); //actions$ is an observable but don't subscribe it. NgRx effects will subscribe for you.

  @Effect({ dispatch: false })
  //dispatch set to false here inform ngrx that this effect will not dispatch any action at last
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationData: string;
      } = JSON.parse(localStorage.getItem("userData"));
      if (!userData) {
        return { type: "DUMMY" };
      }

      const loadUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationData)
      );

      if (loadUser.token) {
        // this.user.next(loadUser);
        return new AuthActions.AuthenticateSuccess({
          email: loadUser.email,
          userId: loadUser.id,
          token: loadUser.token,
          expirationDate: new Date(userData._tokenExpirationData),
        });
        // const expirationDuration =
        //   new Date(userData._tokenExpirationData).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: "DUMMY" };
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem("userData");
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
