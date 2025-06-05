import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter, IonIcon, IonTabBar, IonTabButton} from '@ionic/angular/standalone';
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";
import { ScavangerHuntDataService} from "../services/scavanger-hunt-data.service";
import {addIcons} from "ionicons";
import {exitOutline} from "ionicons/icons";


@Component({
  selector: 'app-finished',
  templateUrl: './finished.page.html',
  styleUrls: ['./finished.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonFooter, ObjectiveStateComponent, ObjectiveTitleComponent, ProgressbarComponent, IonIcon, IonTabBar, IonTabButton]
})
export class FinishedPage implements OnInit {
  points: number | undefined = 0;
  skipedTasks: number | undefined = 0;
  usedTime: number | undefined = 0;

  constructor(private scavengerHunt : ScavangerHuntManagerService, private scavengerHuntData : ScavangerHuntDataService, private router:Router) { }

  ngOnInit() {
    addIcons({exitOutline});
    const currentHuntId = this.scavengerHunt.getCurrentHuntId();
    const currentScavengerHunt = this.scavengerHuntData.getHuntById(currentHuntId)
    this.points = currentScavengerHunt?.points;
    this.skipedTasks = currentScavengerHunt?.reductions;
    this.usedTime = currentScavengerHunt?.totalTime;
    console.log(currentScavengerHunt?.totalTime);
  }

  onExit() {
    this.router.navigate(["/tabs/leaderboard"]);
  }

  formatTime(seconds: number | undefined): string {
    if (seconds === undefined) return '00min 00sek';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}min ${s.toString().padStart(2, '0')}sek`;
  }

}
