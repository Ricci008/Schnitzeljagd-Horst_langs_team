import {Component, Input} from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-objective-title',
  templateUrl: './objective-title.component.html',
  styleUrls: ['./objective-title.component.scss'],
  imports: [
    IonCard,
    IonTitle,
    IonCardContent,
  ],
  standalone: true
})
export class ObjectiveTitleComponent   {
  @Input() title: string = '';
  @Input() description: string = '';

  constructor() { }

}
