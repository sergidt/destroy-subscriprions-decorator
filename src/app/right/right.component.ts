import { Component, OnInit, OnDestroy } from '@angular/core';
import { CombineSubscriptions, DestroySubscriptions } from '../decorators';
import { Unsubscribable } from 'rxjs';
import { AppService } from '../app.service';

@DestroySubscriptions({
  destroyFunction: 'destroy'
})
@Component({
  selector: 'app-right',
  template: `<div class="right-component">
    <h2>Right component</h2>
    <span>value: {{value}}</span>
  </div>`,
})
export class RightComponent implements OnInit {

  value: number;

  @CombineSubscriptions()
  private subscriber: Unsubscribable;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.subscriber = this.appService.stream$.subscribe(_ => this.value = _);
    setTimeout(() => this.destroy(), 5000);
  }

  destroy() {
    console.log('Destroy Component right');
  }

}
