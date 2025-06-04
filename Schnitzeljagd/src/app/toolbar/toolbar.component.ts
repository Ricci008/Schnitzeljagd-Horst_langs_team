import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonActionSheet, IonIcon, IonTabBar, IonTabButton} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {exitOutline, chevronForwardOutline, playSkipForwardOutline} from "ionicons/icons";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonActionSheet
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

  public actionSheetButtons = [
    {
      text: 'Verlassen',
      role: 'destructive',
      data: {
        action: 'exit',
      },
    },
    {
      text: 'Abbrechen',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  isActionSheetOpen: boolean = false;

  onExitClick() {
    this.exit.emit();
  }

  onNextTaskClick() {
    this.nextTask.emit();
  }

  onSkipTaskClick() {
    this.skipTask.emit();
  }

  handleResult($event: any) {
    this.isActionSheetOpen = false;
    if ($event.detail.data.action === 'exit') {
      this.onExitClick();
    }
  }

  openActionSheet() {
    this.isActionSheetOpen = true;
  }
}
