import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonLabel,
  IonItem, IonCard
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ScavangerHuntDataService } from '../services/scavanger-hunt-data.service';
import { ScavengerHunt } from '../models/scavenger-hunt';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.html',
  styleUrls: ['leaderbaord.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton, IonList, IonLabel, IonItem, DatePipe, IonCard]
})
export class LeaderboardPage {
  mode: 'top' | 'latest' = 'top';
  hunts: ScavengerHunt[] = [];

  constructor(private scavangerHuntDataService: ScavangerHuntDataService) {
    this.hunts = this.scavangerHuntDataService.getHunts();
  }

  setMode(mode: 'top' | 'latest') {
    this.mode = mode;
  }

  get filteredHunts(): ScavengerHunt[] {
    if (this.mode === 'top') {
      return [...this.hunts].sort((a, b) => b.points - a.points);
    } else {
      return [...this.hunts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }
}
