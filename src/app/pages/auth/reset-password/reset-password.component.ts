import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MustMatch} from '../../../shared/validators/must-match.validator';
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordDto: FormGroup;
  private newPasswordToken: string;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              public helperService: HelperService,
              private router: Router,
              private store: Store,
              private route: ActivatedRoute) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (!params.get('newPasswordToken')) {
        router.navigate(['/home']);
      }
      this.newPasswordToken = params.get('newPasswordToken');
    });
  }

  ngOnInit(): void {
    this.resetPasswordDto = this.fb.group({
      newPassword: new FormControl(null, [Validators.required,
        Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      newPasswordToken: new FormControl(this.newPasswordToken)
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  get controls() {
    return this.resetPasswordDto.controls;
  }


  resetPassword() {
    this.helperService.showSpinner('Resetting Password...');
    this.store.dispatch(new PushClientActivity({
      user: 'Not Defined',
      action: ActivityType.RESET_PASSWORD,
      description: 'a non defined user has reset his password'
    }));
    this.authService.resetPassword(this.resetPasswordDto.value).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Password Changed Successfully', 'Okay');
      this.router.navigate(['/auth/login']);
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }


}
