import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonLabel,
  IonItem,
  IonCard,
} from '@ionic/angular/standalone';
import { ScavangerHuntDataService } from '../services/scavanger-hunt-data.service';
import { ScavengerHunt } from '../models/scavenger-hunt';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.html',
  styleUrls: ['leaderbaord.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonLabel,
    IonItem,
    DatePipe,
    IonCard,
  ],
})
export class LeaderboardPage implements OnInit {
  mode: 'top' | 'latest' = 'top';
  hunts: ScavengerHunt[] = [];

  constructor(
    private scavangerHuntDataService: ScavangerHuntDataService,
    private route: ActivatedRoute,
  ) {
    this.reloadHunts();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.reloadHunts();
    });

    this.route.url.subscribe(() => {
      this.reloadHunts();
    });
    this.hunts = this.scavangerHuntDataService.getHunts();
  }

  private reloadHunts() {
    this.hunts = this.scavangerHuntDataService.getHunts();
  }

  setMode(mode: 'top' | 'latest') {
    this.mode = mode;
  }

  get filteredHunts(): ScavengerHunt[] {
    if (this.mode === 'top') {
      return [...this.hunts].sort((a, b) => b.points - a.points);
    } else {
      return [...this.hunts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
  }
}
