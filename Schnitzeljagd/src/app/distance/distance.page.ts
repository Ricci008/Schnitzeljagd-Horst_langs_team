import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter} from '@ionic/angular/standalone';
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";

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

  constructor(private ScavangerHunt: ScavangerHuntManagerService) { }

  ngOnInit() {
    this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber();
  }

  nextTask() {
    this.ScavangerHunt.nextObjective();
  }

  markTaskDone() {
    this.isTaskDone = true;
    this.ScavangerHunt.endObjective();
    this.objectiveNumber =+ 1
  }
}
