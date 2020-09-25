import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../shared/services/global-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  @Input() title: string;

  constructor(location: Location, private store: Store,
              private element: ElementRef, private router: Router,
              public gdService: GlobalDataService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  userLogout() {
    this.gdService.userLogout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

}
