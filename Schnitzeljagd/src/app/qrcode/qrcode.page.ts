import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter} from '@ionic/angular/standalone';
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ScavangerHuntManagerService} from "../services/scavanger-hunt-manager.service";
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
  standalone: true,
  imports: [IonContent, ZXingScannerModule, CommonModule, FormsModule, ObjectiveTitleComponent, ObjectiveStateComponent, IonFooter, ProgressbarComponent, ToolbarComponent]
})
export class QrcodePage implements OnInit {
  objectiveNumber: number = 0;
  isTaskDone: boolean = false;

  constructor(private ScavangerHunt: ScavangerHuntManagerService) { }

  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  ngOnInit() {
    this.objectiveNumber = this.ScavangerHunt.getObjectiveNumber() - 1;
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
    this.objectiveNumber += 1
  }

  exitHunt() {
    this.ScavangerHunt.exitHunt();
  }

  validQRCode = 'M335@ICT-BZ';

  onCodeResult(result: string) {
    if (result === this.validQRCode && !this.isTaskDone) {
      this.markTaskDone();
    }
  }

}
