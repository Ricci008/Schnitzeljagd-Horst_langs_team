import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFooter } from '@ionic/angular/standalone';
import { Network } from '@capacitor/network';
import { ObjectiveStateComponent } from '../objective-state/objective-state.component';
import { ObjectiveTitleComponent } from '../objective-title/objective-title.component';
import { ProgressbarComponent } from '../progressbar/progressbar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ScavangerHuntManagerService } from '../services/scavanger-hunt-manager.service';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonFooter,
    ObjectiveStateComponent,
    ObjectiveTitleComponent,
    ProgressbarComponent,
    ToolbarComponent,
  ],
})
export class WifiPage implements OnInit {
  objectiveNumber: number = 0;
  isTaskDone: boolean = false;

  constructor(
    private ScavangerHunt: ScavangerHuntManagerService,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber() - 1;

    Network.addListener('networkStatusChange', (status) => {
      this.ngZone.run(() => {
        if (
          status.connected &&
          status.connectionType === 'wifi' &&
          !this.isTaskDone
        ) {
          this.markTaskDone();
        }
      });
    });
  }

  nextTask() {
    this.ScavangerHunt.nextObjective();
  }

  skipTask() {
    this.ScavangerHunt.endObjective();
    this.ScavangerHunt.nextObjective(true);
  }

  markTaskDone() {
    this.ngZone.run(() => {
      this.isTaskDone = true;
      this.ScavangerHunt.endObjective();
      this.objectiveNumber += 1;
    });
  }

  exitHunt() {
    this.ScavangerHunt.exitHunt();
  }
}
