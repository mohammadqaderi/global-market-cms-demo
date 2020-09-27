import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-show-error-dialog',
  templateUrl: './show-error-dialog.component.html',
  styleUrls: ['./show-error-dialog.component.css']
})
export class ShowErrorDialogComponent implements OnInit {
  errorName: string;
  errorMessage: string;

  @Input() error: any;

  constructor(public helperService: HelperService) {
  }

  ngOnInit(): void {
    if ([403].indexOf(this.error.statusCode) !== -1) {
      this.errorName = 'Forbidden Resource';
      this.errorMessage = 'This Resource cannot be access without permissions (Forbidden)';
    } else if ([401].indexOf(this.error.statusCode) !== -1) {
      this.errorName = 'Unauthorized!!';
      this.errorMessage = 'You\'re not authorized, please login to have the access';
    } else if ([400, 404, 409].indexOf(this.error.statusCode) !== -1) {
      this.errorName = this.error.error;
      this.errorMessage = this.error.message;
    } else if ([500].indexOf(this.error.statusCode) !== -1) {
      this.errorName = 'An strange error occurred!';
      this.errorMessage = 'please come back later while the support team fix this issue';
    }
  }
}
