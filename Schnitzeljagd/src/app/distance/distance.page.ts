import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter} from '@ionic/angular/standalone';
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ProgressbarComponent, ToolbarComponent, IonFooter, ObjectiveStateComponent, ObjectiveTitleComponent]
})
export class DistancePage implements OnInit {
  objectiveNumber: number = 0;
  isTaskDone: boolean = false;

  startCoords: { latitude: number, longitude: number } | null = null;
  watchId: string | null = null;
  totalDistance: number = 0;

  constructor(private ScavangerHunt: ScavangerHuntManagerService) { }

  async ngOnInit() {
    this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber() - 1;
    await this.startTracking();
  }

  async startTracking() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.startCoords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.watchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (position, error) => {
        if (error || !position || !this.startCoords) return;

        const newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        const distance = this.calculateDistance(this.startCoords, newCoords);
        this.totalDistance += distance;

        this.startCoords = newCoords;

        if (this.totalDistance >= 10 && !this.isTaskDone) {
          this.markTaskDone();
          this.clearLocationWatch();
        }
      });
    } catch (error) {
      console.error('Fehler beim Starten des GPS-Trackings', error);
    }
  }

  calculateDistance(coord1: { latitude: number, longitude: number }, coord2: { latitude: number, longitude: number }): number {
    const earthRadiusInMeters  = 6371e3;
    const lat1InRadians  = coord1.latitude * Math.PI / 180;
    const lat2InRadians  = coord2.latitude * Math.PI / 180;
    const deltaLat  = (coord2.latitude - coord1.latitude) * Math.PI / 180;
    const deltaLon  = (coord2.longitude - coord1.longitude) * Math.PI / 180;

    const haversineIntermediate = Math.sin(deltaLat  / 2) ** 2 +
      Math.cos(lat1InRadians ) * Math.cos(lat2InRadians ) *
      Math.sin(deltaLon  / 2) ** 2;

    const angularDistance  = 2 * Math.atan2(Math.sqrt(haversineIntermediate), Math.sqrt(1 - haversineIntermediate));

    return earthRadiusInMeters  * angularDistance ;
  }

  async clearLocationWatch() {
    if (this.watchId) {
      await Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
    }
  }

  nextTask() {
    this.ScavangerHunt.endObjective();
    this.ScavangerHunt.completeHunt();
  }

  skipTask() {
    this.ScavangerHunt.completeHunt();
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
