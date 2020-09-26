import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  enableToRegisterAsAdmins = false;
  enableUserToCheckout = false;
  makeClientSideUnderMaintenance = false;
  disableEditingData = false;

  constructor(public helperService: HelperService) {
  }

  ngOnInit(): void {
  }

}
