import { Component, OnInit } from '@angular/core';
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
  quest= true;

  constructor() {
    addIcons({exitOutline, chevronForwardOutline, playSkipForwardOutline});
  }

  ngOnInit(): void {
    }

}
