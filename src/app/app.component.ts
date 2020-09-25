import {Component} from '@angular/core';
import {Actions, ofActionDispatched} from '@ngxs/store';
import {Router} from '@angular/router';
import {Logout} from './state-management/auth/auth-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private actions: Actions, private router: Router) {
  }

  ngOnInit(): void {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
