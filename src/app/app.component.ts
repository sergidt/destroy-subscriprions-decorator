import { Component } from '@angular/core';

export enum State {
  Left,
  Right
}

@Component({
  selector: 'app-root',
  template: `<h1>Application</h1>
  <button (click)="switchState()">Switch component</button>
  <br><br>
  <app-left *ngIf="state === State.Left"></app-left>
  <app-right *ngIf="state === State.Right"></app-right>
`,
})
export class AppComponent {
  State = State;
  state: State = State.Left;

  switchState() {
    this.state = this.state === State.Left ? State.Right : State.Left;
  }
}
