import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ObjectiveTitleComponent, ObjectiveStateComponent, IonFooter, ProgressbarComponent, ToolbarComponent]
})
export class SensorsPage implements OnInit, OnDestroy {
  objectiveNumber: number = 0;
  isTaskDone: boolean = false;
  private orientationHandler: any;

  constructor(
    private ScavangerHunt: ScavangerHuntManagerService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber() - 1;
    this.orientationHandler = (event: DeviceOrientationEvent) => {
      if ((Math.abs(event.beta ?? 0) > 80 && Math.abs(event.beta ?? 0) < 100) && !this.isTaskDone) {
        this.ngZone.run(() => this.markTaskDone());
      }
    };
    window.addEventListener('deviceorientation', this.orientationHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('deviceorientation', this.orientationHandler);
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
    this.objectiveNumber =+ 1;
  }

  exitHunt() {
    this.ScavangerHunt.exitHunt();
  }
}
