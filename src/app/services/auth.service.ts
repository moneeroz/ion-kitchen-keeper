import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  recoverLoginDetails(email: string): Observable<void> {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        if (email == 'error@error.com') {
          observer.error({ message: 'Email not found' });
        }
        observer.next();
        observer.complete();
      }, 2500);
    });
  }
}
