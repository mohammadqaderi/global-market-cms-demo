import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {Router} from '@angular/router';
import {CustomValidators} from 'ngx-custom-validators';
import {EmailPattern} from '../../../commons/constants';
import {RegisterAdmin} from '../../../state-management/auth/auth-actions';
import {ErrorMessages} from '../../../commons/helpers/functions/error-messages';
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  registrationForm: FormGroup;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;
  errorMessages = new ErrorMessages();

  constructor(private fb: FormBuilder,
              private store: Store,
              private gdService: GlobalDataService,
              private router: Router,
              public helperService: HelperService) {
    if (gdService.IsAuthenticated()) {
      router.navigate(['/dashboard']);
    }
  }

  get Username() {
    return this.registrationForm.get('username');
  }

  get Email() {
    return this.registrationForm.get('email');
  }


  get Password() {
    return this.registrationForm.get('password');
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: new FormControl(null,
        [
          Validators.required]
      ),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
        CustomValidators.email,
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }


  submitRegister() {
    this.helperService.showSpinner('Please Wait...');
    this.store.dispatch(new PushClientActivity({
      user: this.registrationForm.value.username,
      action: ActivityType.REGISTER,
      description: `${this.gdService.Username} has register in our system`
    }));
    const data = {
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };
    this.store.dispatch(new RegisterAdmin(data)).subscribe(() => {
      this.helperService.hideSpinner();
      this.router.navigate(['/auth/create-profile']);

    }, error => {
      this.helperService.showErrorDialog(error, this.errorTemplate);

    });
  }

}
