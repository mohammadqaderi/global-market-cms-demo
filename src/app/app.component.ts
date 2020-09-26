import {Component} from '@angular/core';
import {Actions, ofActionDispatched} from '@ngxs/store';
import {Router} from '@angular/router';
import {Logout} from './state-management/auth/auth-actions';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {HelperService} from './shared/services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private actions: Actions, private router: Router, private helperService: HelperService) {
  }


  ngOnInit(): void {
    this.checkOnlineStatus();
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  checkOnlineStatus = () => {
    this.helperService.onlineEvent = fromEvent(window, 'online');
    this.helperService.offlineEvent = fromEvent(window, 'offline');
    this.helperService.subscriptions.push(this.helperService.onlineEvent.subscribe(() => {
      this.helperService.setIsOnline(true);
    }));
    this.helperService.subscriptions.push(this.helperService.offlineEvent.subscribe(() => {
      this.helperService.setIsOnline(false);
      this.router.navigate(['/no-internet']);
    }));
  };
}
