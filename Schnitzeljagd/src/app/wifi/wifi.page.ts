import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter} from '@ionic/angular/standalone';
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";

declare var WifiWizard2: any;

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonFooter, ObjectiveStateComponent, ObjectiveTitleComponent, ProgressbarComponent, ToolbarComponent]
})
export class WifiPage implements OnInit {
  objectiveNumber: number = 0;
  isTaskDone: boolean = false;
  private ssidCheckInterval: any;

  constructor(private ScavangerHunt: ScavangerHuntManagerService) {}

  ngOnInit() {
    this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber() - 1;
    this.startSSIDCheckLoop();
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

  startSSIDCheckLoop() {
    this.ssidCheckInterval = setInterval(() => {
      WifiWizard2.getConnectedSSID(
        (ssid: string) => {
          if (ssid === 'ICT-BLJ') {
            this.markTaskDone();
            clearInterval(this.ssidCheckInterval);
          }
        },
        (error: any) => {
          console.error('Error getting connected SSID:', error);
        }
      );
    }, 1000);
  }
}
