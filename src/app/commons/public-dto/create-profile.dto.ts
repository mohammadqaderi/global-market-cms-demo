import {Gender} from '../enums/gender.enum';
import {Contact} from '../classes/contact';

export class CreateProfileDto {

  displayName: string;

  gender: Gender;

  contacts: Contact[];

  country: string;

  city: string;

}
