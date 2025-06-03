import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";

@Component({
  selector: 'app-charger',
  templateUrl: './charger.page.html',
  styleUrls: ['./charger.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ProgressbarComponent, ObjectiveTitleComponent, ObjectiveStateComponent, ToolbarComponent, IonFooter]
})
export class ChargerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
