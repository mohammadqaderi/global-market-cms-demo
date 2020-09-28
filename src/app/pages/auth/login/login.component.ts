import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {EmailPattern} from '../../../commons/constants';
import {CustomValidators} from 'ngx-custom-validators';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {Login} from '../../../state-management/auth/auth-actions';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Router} from '@angular/router';
import {ProfileActions} from '../../../state-management/profile/profile.actions';
import {AuthState} from '../../../state-management/auth/auth.state';
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';
import FetchUserProfile = ProfileActions.FetchUserProfile;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailLoginDto: FormGroup;
  emailRequestForm: FormGroup;
  // special Case
  isSent = false;
  message: string = null;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private store: Store,
              private gdService: GlobalDataService,
              private router: Router,
              public helperService: HelperService) {
    if (gdService.IsAuthenticated()) {
      router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.emailLoginDto = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
        CustomValidators.email,
      ]),
      password: new FormControl(null, Validators.required)
    });
    this.emailRequestForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
        CustomValidators.email,
      ])
    });
  }

  get Email() {
    return this.emailLoginDto.get('email');
  }

  get ForgotRequestEmail() {
    return this.emailRequestForm.get('email');

  }

  submitLogin() {
    this.helperService.showSpinner('Please Wait...');
    let email = this.emailLoginDto.value.email;
    this.store.dispatch(new PushClientActivity({
      action: ActivityType.LOGIN,
      user: email, description: `User with email ${email} logged in`
    }));
    this.store.dispatch(new Login(this.emailLoginDto.value)).subscribe(() => {
      this.helperService.hideSpinner();
      if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
        if (this.gdService.User.profileId) {
          this.store.dispatch(new FetchUserProfile()).subscribe(() => {
            if (!this.gdService.Profile) {
              this.router.navigate(['/auth/create-profile']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          });
        } else {
          this.router.navigate(['/auth/create-profile']);
        }
      }
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  sendEmailForgotPassword() {
    this.helperService.showSpinner('Sending Request...');
    this.store.dispatch(new PushClientActivity({
      user: 'Not Defined',
      action: ActivityType.SEND_FORGOT_REQUEST_PASSWORD,
      description: `A non defined has requested to change his password`
    }));
    this.authService.forgotPassword(this.emailRequestForm.value.email)
      .subscribe(result => {
        this.message = `Your Request has been sent successfully, please checkout
         your email inbox to confirm your request and reset your password`;
        this.isSent = true;
        this.helperService.hideSpinner();
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
  }

}
