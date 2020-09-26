import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css']
})
export class NoInternetComponent implements OnInit {

  constructor(private helperService: HelperService, private router: Router) {

  }

  ngOnInit(): void {
    const isOnline = sessionStorage.getItem('isOnline');
    if (isOnline === 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  reload() {
    location.reload();
  }

}
