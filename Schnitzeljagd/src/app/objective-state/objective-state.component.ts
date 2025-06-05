import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-objective-state',
  templateUrl: './objective-state.component.html',
  styleUrls: ['./objective-state.component.scss'],
  imports: [IonCard, IonCardContent],
})
export class ObjectiveStateComponent {
  @Input() objectiveState: string = '';

  constructor() {}
}
