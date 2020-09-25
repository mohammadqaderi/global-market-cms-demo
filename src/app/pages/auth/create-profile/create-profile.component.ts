import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {FileUploader} from 'ng2-file-upload';
import {ErrorMessages} from '../../../commons/helpers/functions/error-messages';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Router} from '@angular/router';
import {ProfileActions} from '../../../state-management/profile/profile.actions';
import CreateAdminProfile = ProfileActions.CreateAdminProfile;

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit, OnDestroy {

  errorMessages = new ErrorMessages();
  createProfileForm: FormGroup;
  formSubmitted = false;


  public uploader: FileUploader = new FileUploader({});

  constructor(private fb: FormBuilder,
              private store: Store,
              private router: Router,
              public helperService: HelperService,
              private gdService: GlobalDataService) {
    if (gdService.Profile) {
      router.navigate(['/dashboard']);
    }
  }

  get Contacts() {
    return this.createProfileForm.get('contacts') as FormArray;
  }

  get Controls() {
    return this.createProfileForm.controls;
  }


  ngOnInit() {
    this.createProfileForm = this.fb.group({
      displayName: new FormControl(null, [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      contacts: this.fb.array([], [Validators.required])
    });

  }

  createProfile() {
    this.helperService.state = 'Creating Profile, Please Wait...';
    this.formSubmitted = true;
    this.store.dispatch(new CreateAdminProfile(this.createProfileForm.value)).toPromise().then(() => {
      this.helperService.hideSpinner();
      this.helperService.adjustData();
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnDestroy(): void {
    this.helperService.adjustData();
  }

}
