import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {FileUploader} from 'ng2-file-upload';
import {ErrorMessages} from '../../../commons/helpers/functions/error-messages';
import {HelperService} from '../../../shared/services/helper.service';
import {AuthService} from '../../../services/auth/auth.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Router} from '@angular/router';
import {Contact} from '../../../commons/classes/contact';
import {ProfileActions} from '../../../state-management/profile/profile.actions';
import EditProfile = ProfileActions.EditProfile;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  formChanged: boolean;
  updateProfileForm: FormGroup;
  errorMessages = new ErrorMessages();
  public uploader: FileUploader = new FileUploader({});
  startUploadingImage = false;

  constructor(private fb: FormBuilder,
              private store: Store,
              public helperService: HelperService,
              private router: Router,
              private authService: AuthService,
              private gdService: GlobalDataService) {
    if (!gdService.Profile) {
      router.navigate(['/auth/create-profile']);
    }

  }

  get Controls() {
    return this.updateProfileForm.controls;
  }

  get Profile() {
    return this.gdService.Profile;
  }

  get DisplayName() {
    return this.updateProfileForm.get('displayName');
  }

  get Description() {
    return this.updateProfileForm.get('description');
  }

  onImageSelect(event) {
    this.helperService.onImageSelect(event);
    if (!this.helperService.isInvalidImageType) {
      this.patchImage('image selected');
    }
  }


  get Contacts() {
    return this.updateProfileForm.get('contacts') as FormArray;
  }


  patchImage(file: string) {
    this.updateProfileForm.patchValue({
      image: file
    });
  }

  ngOnInit() {
    if (this.Profile) {
      this.updateProfileForm = this.fb.group({
        displayName: new FormControl(this.Profile.displayName, [Validators.required]),
        city: new FormControl(this.Profile.city, [Validators.required]),
        country: new FormControl(this.Profile.country, [Validators.required]),
        gender: new FormControl(this.Profile.gender, [Validators.required]),
        email: new FormControl({
          value: this.gdService.User.email,
          disabled: true
        }),
        contacts: this.fb.array([], [Validators.required])
      });
      for (let i = 0; i < this.Profile.contacts.length; i++) {
        this.addContact(this.Profile.contacts[i]);
      }
    }
    this.updateProfileForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });

  }

  addContact(contact: Contact) {
    this.Contacts.push(this.fb.group({
      address: new FormControl(contact.address, [Validators.required]),
      phone: new FormControl(contact.phone, [Validators.required]),
    }));
  }


  async updateImage() {
    // this.startUploadingImage = true;
    // const {filePath} = await this.mediaService
    //   .changeImage('profile-images', this.Profile.image, this.helperService.imageFormData).toPromise();
    // await this.store.dispatch(new UpdateProfileImage(filePath)).toPromise();
    // this.helperService.openSnackbar('Image uploaded successfully', 'Okay');
    // this.patchImage(filePath);
    // this.helperService.adjustData();
    // this.startUploadingImage = false;
  }


  updateProfile() {
    const {displayName,} = this.updateProfileForm.value;
    this.helperService.showSpinner('Updating Profile...');
    this.store.dispatch(new EditProfile(this.updateProfileForm.value)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Profile Updated Successfully', 'Okay');
    });
  }

}
