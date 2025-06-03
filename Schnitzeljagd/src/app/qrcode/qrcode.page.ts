import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonFooter, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ObjectiveTitleComponent} from "../objective-title/objective-title.component";
import {ObjectiveStateComponent} from "../objective-state/objective-state.component";
import {ProgressbarComponent} from "../progressbar/progressbar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ObjectiveTitleComponent, ObjectiveStateComponent, IonFooter, ProgressbarComponent, ToolbarComponent]
})
export class QrcodePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
