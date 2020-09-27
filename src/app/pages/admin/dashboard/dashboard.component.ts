import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {FetchGlobalData} from '../../../state-management/global-data/global-data.actions';
import {FetchAllActivities} from '../../../state-management/activity/activity.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public gdService: GlobalDataService, public helperService: HelperService,
              private store: Store) {
  }

  ngOnInit() {
    if (!this.gdService.GlobalData) {
      this.helperService.showSpinner('Loading Data...');
      this.store.dispatch(new FetchGlobalData()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }

    if (!this.gdService.Activities && this.gdService.isSuperAdmin()) {
      this.loadActivities(10, null);
    }

  }

  loadActivities(take: number, skip?: number) {
    this.helperService.showSpinner('Loading Activities...');
    this.store.dispatch(new FetchAllActivities({take: 10, skip})).subscribe(() => {
      this.helperService.hideSpinner();
    });
  }


  get Activities() {
    return this.gdService.Activities;
  }

  get GlobalData() {
    return this.gdService.GlobalData;
  }
}
