import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonLabel,
  IonItem
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.html',
  styleUrls: ['leaderbaord.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton, IonList, IonLabel, IonItem]
})
export class LeaderboardPage {
  mode: 'top' | 'latest' = 'top';

  topList = [
    { name: 'Max Mustermann', time: 80 },
    { name: 'Erika Mustermann', time: 90 },
    { name: 'Hans Müller', time: 100 }

  ];

  latestList = [
    { name: 'Max Mustermann', time: 30 },
    { name: 'Erika Mustermann', time: 40 },
    { name: 'Hans Müller', time: 50 }
  ];

  get list() {
    return this.mode === 'top' ? this.topList : this.latestList;
  }

  setMode(mode: 'top' | 'latest') {
    this.mode = mode;
  }
  constructor() {}

}
