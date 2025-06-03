import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";

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
    this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber();
  }

  nextTask() {
    this.ScavangerHunt.nextObjective();
  }

  markTaskDone() {
    this.isTaskDone = true;
    this.objectiveNumber =+ 1
  }
}
