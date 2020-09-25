import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../services/auth/auth.service';
import {EmailPattern} from '../../../commons/constants';
import {CustomValidators} from 'ngx-custom-validators';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {Login} from '../../../state-management/auth/auth-actions';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Router} from '@angular/router';
import {ProfileActions} from '../../../state-management/profile/profile.actions';
import FetchUserProfile = ProfileActions.FetchUserProfile;
import {AuthState} from '../../../state-management/auth/auth.state';

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
              private modalService: BsModalService,
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
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  sendEmailForgotPassword() {
    // this.helperService.showSpinner('Sending Request...');
    // this.authService.sendEmailRequestPassword(this.emailRequestForm.value)
    //   .subscribe((result: { isSuccessful: boolean, data: string }) => {
    //     this.helperService.hideSpinner();
    //     this.message = result.data;
    //     this.isSent = true;
    //     setTimeout(() => {
    //       this.helperService.hideDialog();
    //     }, 2500);
    //   });
  }

}
