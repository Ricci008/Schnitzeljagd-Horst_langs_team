import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ScavangerHuntDataService } from './scavanger-hunt-data.service';
import { OnlineLeaderboardConectorService } from "./online-leaderboard-conector.service";
import { ScavengerHunt } from '../models/scavenger-hunt';
import {Haptics, NotificationType} from '@capacitor/haptics';

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

  constructor(private DataService: ScavangerHuntDataService, private onlineLeaderbaord : OnlineLeaderboardConectorService, private router: Router) {}

  getCurrentHuntId(): number {
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
    Haptics.notification({ type: NotificationType.Success });
  }

  endObjective(): void {
    const huntId = this.getCurrentHuntId();

    const hunt = this.DataService.getHuntById(huntId);

    if (hunt) {
      const lastTimestamp = hunt.timestamps[hunt.timestamps.length - 1];
      lastTimestamp.endTime = new Date().toISOString();

      this.DataService.updateHunt(huntId, hunt);
      Haptics.notification({ type: NotificationType.Success });
    }
  }

  nextObjective(skip : boolean = false): void {
    const huntId = this.getCurrentHuntId();

    const hunt = this.DataService.getHuntById(huntId);
    if (hunt) {
      const lastTimestamp = hunt.timestamps[hunt.timestamps.length - 1];

      const nextObjective = lastTimestamp.objective + 1;
      hunt.timestamps.push({
        objective: nextObjective,
        startTime: new Date().toISOString(),
        endTime: ''
      });

      if (!skip) {
        hunt.points += 1;
        Haptics.notification({ type: NotificationType.Success });
      } else {
        Haptics.notification({ type: NotificationType.Warning });
      }

      this.DataService.updateHunt(huntId, hunt);

      if (nextObjective > this.objectiveRoutes.length) {
        this.completeHunt();
      } else {
        this.router.navigate([this.objectiveRoutes[nextObjective - 1]]);
      }
    }
  }

  private completeHunt(): void {
    const huntId = this.getCurrentHuntId();

    const hunt = this.DataService.getHuntById(huntId);
    if (hunt) {
      const lastTimestamp = hunt.timestamps[hunt.timestamps.length - 1];
      lastTimestamp.endTime = new Date().toISOString();

      for (let i = 0; i < hunt.timestamps.length; i++) {
        const timestamp = hunt.timestamps[i];

        const objectiveTime = (new Date(timestamp.endTime).getTime() - new Date(timestamp.startTime).getTime()) / 1000;

        if (objectiveTime > 45)  {
          hunt.reductions += 1;
        }
      }

      hunt.totalTime = (new Date(lastTimestamp.endTime).getTime() - new Date(hunt.timestamps[0].startTime).getTime()) / 1000;

      Haptics.notification({ type: NotificationType.Success });
      this.DataService.updateHunt(huntId, hunt);
      this.onlineLeaderbaord.submitScore(hunt.playerName, hunt.points, hunt.reductions, hunt.totalTime);
      this.router.navigate(['/finished'])
    }
  }

  exitHunt(): void {
    const huntId = this.getCurrentHuntId();
    this.DataService.deleteHunt(huntId)
    Haptics.notification({ type: NotificationType.Error });
    this.router.navigate(['/tabs/leaderboard']);
  }
}
