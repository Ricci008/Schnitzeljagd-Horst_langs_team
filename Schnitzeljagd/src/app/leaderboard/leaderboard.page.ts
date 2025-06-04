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
import { ScavangerHuntDataService } from '../services/scavanger-hunt-data.service';
import { ScavengerHunt } from '../models/scavenger-hunt';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.html',
  styleUrls: ['leaderbaord.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton, IonList, IonLabel, IonItem]
})
export class LeaderboardPage {
  mode: 'top' | 'latest' = 'top';
  hunts: ScavengerHunt[] = [];

  constructor(private scavangerHuntDataService: ScavangerHuntDataService) {
    this.scavangerHuntDataService.seedTestData();
    this.hunts = this.scavangerHuntDataService.getHunts();
  }

  setMode(mode: 'top' | 'latest') {
    this.mode = mode;
  }

  get filteredHunts(): ScavengerHunt[] {
    if (this.mode === 'top') {
      return [...this.hunts].sort((a, b) => a.totalTime - b.totalTime);
    } else {
      return [...this.hunts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }
}
