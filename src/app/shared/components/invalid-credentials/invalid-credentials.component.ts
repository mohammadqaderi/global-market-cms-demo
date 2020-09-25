import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-invalid-credentials',
  templateUrl: './invalid-credentials.component.html',
  styleUrls: ['./invalid-credentials.component.css']
})
export class InvalidCredentialsComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  @Input() errorMessage: BsModalRef;

  constructor(public helperService: HelperService) {
  }

  ngOnInit(): void {

  }

  hide() {
    this.modalRef.hide();
  }

}
