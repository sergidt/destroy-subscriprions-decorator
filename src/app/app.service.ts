import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  stream$: Observable<number>;

  constructor() {
    this.stream$ = timer(0, 1000);
  }
}
