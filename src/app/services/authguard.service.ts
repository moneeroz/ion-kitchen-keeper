import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { IappState } from 'src/store/iapp-state';
import { authFeature } from 'src/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<IappState>,
  ) {}

  // canActivate(): boolean {
  //   if (!this.userService.isAuthenticated()) {
  //     this.router.navigateByUrl('login');
  //     return false;
  //   }
  //   return true;
  // }

  canActivate(): Observable<boolean> {
    return this.store.select(authFeature).pipe(
      take(1),
      switchMap((authState) => {
        if (authState.isLoggedIn) {
          return of(true);
        }
        this.router.navigateByUrl('login');
        return of(false);
      }),
    );
  }
}
