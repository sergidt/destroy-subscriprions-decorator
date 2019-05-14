import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { CombineSubscriptions, DestroySubscriptions } from '../decorators';
import { AppService } from '../app.service';

@DestroySubscriptions()
@Component({
  selector: 'app-left',
  template: `<div class="left-component">
    <h2>Left component</h2>
    <span>value: {{value}}</span>
  </div>`,
})
export class LeftComponent implements OnInit, OnDestroy {

  @CombineSubscriptions()
  protected subscriber: Unsubscribable;

  value: number;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.subscriber = this.appService.stream$.subscribe(_ => this.value = _);
  }

  ngOnDestroy() {
    console.log('Destroy Component left');
  }

}
