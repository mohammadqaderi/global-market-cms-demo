import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {FetchGlobalData} from '../../../state-management/global-data/global-data.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
  }

  get GlobalData(){
    return this.gdService.GlobalData
  }
}
