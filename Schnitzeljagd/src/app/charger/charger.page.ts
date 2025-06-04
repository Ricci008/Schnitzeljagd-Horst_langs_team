import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Device } from '@capacitor/device';
import {IonContent, IonFooter, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-charger',
  templateUrl: './charger.page.html',
  styleUrls: ['./charger.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ProgressbarComponent, ObjectiveTitleComponent, ObjectiveStateComponent, ToolbarComponent, IonFooter]
})
export class ChargerPage implements OnInit {
  objectiveNumber: number = 0;
  isTaskDone: boolean = false;

  constructor(private ScavangerHunt: ScavangerHuntManagerService) { }

  ngOnInit() {
    this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber() - 1;
    this.startChargerStatePolling()
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

  startChargerStatePolling() {
    interval(300).subscribe(() => {
      Device.getBatteryInfo().then(batteryInfo => {
        if (batteryInfo.isCharging && !this.isTaskDone) {
          this.markTaskDone();
        }
      })
    });
  }
}
