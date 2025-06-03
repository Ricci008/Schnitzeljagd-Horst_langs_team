import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ScavangerHuntDataService } from './scavanger-hunt-data.service';
import { ScavengerHunt } from '../models/scavenger-hunt';

@Injectable({
  providedIn: 'root'
})
export class ScavangerHuntManagerService {

  objectiveRoutes = [
    "geolocation",
    "qrcode",
    "sensors",
    "charger",
    "wifi",
    "distance"
  ];

  constructor(private DataService: ScavangerHuntDataService, private router: Router) {}

  private getCurrentHuntId(): number {
    const hunts = this.DataService.getHunts();
    return hunts.length > 0 ? hunts[hunts.length - 1].id : 0;
  }

  getObjectiveNumber(): number {
    const huntId = this.getCurrentHuntId();
    const hunt = this.DataService.getHuntById(huntId);
    return hunt ? hunt.timestamps.length : 0;
  }

  startHunt(playerName: string): void {
    const newHuntId = this.DataService.getHunts().length + 1;

    const newHunt: ScavengerHunt = {
      id: newHuntId,
      playerName,
      date: new Date().toISOString().split('T')[0],
      points: 0,
      reductions: 0,
      totalTime: 0,
      timestamps: [
        {
          objective: 1,
          startTime: new Date().toISOString(),
          endTime: ''
        }
      ]
    };

    this.DataService.addHunt(newHunt);
    this.router.navigate([this.objectiveRoutes[0]]);
  }

  nextObjective(): void {
    const huntId = this.getCurrentHuntId();

    const hunt = this.DataService.getHuntById(huntId);
    if (hunt) {
      const lastTimestamp = hunt.timestamps[hunt.timestamps.length - 1];
      lastTimestamp.endTime = new Date().toISOString();

      const nextObjective = lastTimestamp.objective + 1;
      hunt.timestamps.push({
        objective: nextObjective,
        startTime: new Date().toISOString(),
        endTime: ''
      });

      hunt.points += 1;
      this.DataService.updateHunt(huntId, hunt);

      this.router.navigate([this.objectiveRoutes[nextObjective - 1]]);
    }
  }

  completeHunt(): void {
    const huntId = this.getCurrentHuntId();

    const hunt = this.DataService.getHuntById(huntId);
    if (hunt) {
      const lastTimestamp = hunt.timestamps[hunt.timestamps.length - 1];
      lastTimestamp.endTime = new Date().toISOString();

      for (let i = 0; i < hunt.timestamps.length; i++) {
        const timestamp = hunt.timestamps[i];

        const objectiveTime = (new Date(timestamp.endTime).getTime() - new Date(timestamp.startTime).getTime()) / 1000;

        if (objectiveTime > 60)  {
          hunt.reductions += 1;
        }
      }

      this.DataService.updateHunt(huntId, hunt);
    }
  }
}
