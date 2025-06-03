import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonIcon, IonTabBar, IonTabButton} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {exitOutline, chevronForwardOutline, playSkipForwardOutline} from "ionicons/icons";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
    IonTabBar,
    IonTabButton,
    IonIcon
  ]
})
export class ToolbarComponent  implements OnInit {
  @Input() taskDone = false;

  @Output() exit = new EventEmitter<void>();
  @Output() nextTask = new EventEmitter<void>();
  @Output() skipTask = new EventEmitter<void>();

  constructor() {
    addIcons({exitOutline, chevronForwardOutline, playSkipForwardOutline});
  }

  ngOnInit(): void {}

  onExitClick() {
    this.exit.emit();
  }

  onNextTaskClick() {
    this.nextTask.emit();
  }

  onSkipTaskClick() {
    this.skipTask.emit();
  }
}
