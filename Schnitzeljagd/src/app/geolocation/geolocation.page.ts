import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import { Geolocation} from "@capacitor/geolocation";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";

import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";

export function haversineDistance(
  coords1: { latitude: number; longitude: number },
  coords2: { latitude: number; longitude: number },
) {
  const R = 6371e3;
  const lat1Rad = coords1.latitude * (Math.PI / 180);
  const lat2Rad = coords2.latitude * (Math.PI / 180);
  const deltaLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
  const deltaLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
    Math.cos(lat2Rad) *
    Math.sin(deltaLon / 2) *
    Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ObjectiveTitleComponent, ObjectiveStateComponent, IonFooter, ProgressbarComponent, ToolbarComponent]
})
export class GeolocationPage implements OnInit, OnDestroy {
  objectiveNumber: number = 0;
  isTaskDone: boolean = false;
  distanceToTarget: number | null = null;
  private intervalId: any;

  targetCoords = { latitude: 47.02758723687247, longitude: 8.300906172755733  };


  constructor(private ScavangerHunt: ScavangerHuntManagerService, private ngZone: NgZone) { }

  ngOnInit() {
     this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber() - 1;
    this.startLocationCheck();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async startLocationCheck() {
    this.intervalId = setInterval(async () => {
      const position = await Geolocation.getCurrentPosition();
      const currentCoords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      const distance = haversineDistance(currentCoords, this.targetCoords);
      this.ngZone.run(() => {
        this.distanceToTarget = distance;
        if (distance < 10 && !this.isTaskDone) {
          this.markTaskDone();
        }
      });
    }, 5000);
  }

  nextTask() {
    this.ScavangerHunt.nextObjective();
  }

  skipTask() {
    this.ScavangerHunt.nextObjective(true);
    this.ScavangerHunt.endObjective();
  }

  markTaskDone() {
    this.isTaskDone = true;
    this.ScavangerHunt.endObjective();
    this.objectiveNumber += 1;
  }

  exitHunt() {
    this.ScavangerHunt.exitHunt();
  }
}
