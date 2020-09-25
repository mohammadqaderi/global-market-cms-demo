import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../../commons/classes/contact";

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css']
})
export class AddContactsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() Contacts: FormArray;
  contact: Contact = new Contact();

  constructor(private fb: FormBuilder) {
  }


  addContact(contact: Contact) {
    this.Contacts.push(this.fb.group({
      address: new FormControl(contact.address, [Validators.required]),
      phone: new FormControl(contact.phone, [Validators.required])
    }));
  }

  ngOnInit(): void {
  }

  removeContact(index: any) {
    this.Contacts.removeAt(index);
  }


  ContactControl(controlIndex: number) {
    return this.Contacts.controls[controlIndex];
  }

}
