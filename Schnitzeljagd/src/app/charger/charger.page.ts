import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";

@Component({
  selector: 'app-charger',
  templateUrl: './charger.page.html',
  styleUrls: ['./charger.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ProgressbarComponent, ObjectiveTitleComponent, ObjectiveStateComponent]
})
export class ChargerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
