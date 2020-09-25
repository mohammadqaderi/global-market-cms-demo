import {Contact} from '../../commons/classes/contact';
import {Gender} from '../../commons/enums/gender.enum';

export class ProfileModel {
  id: number;

  displayName: string;

  gender: Gender;

  country: string;

  city: string;

  contacts: Contact[];

  image: string;

}
