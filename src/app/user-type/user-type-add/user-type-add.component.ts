import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../api.service";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
import { TipoDocumento } from "../../documentType";

@Component({
  selector: "app-user-type-add",
  templateUrl: "./user-type-add.component.html",
  styleUrls: ["./user-type-add.component.sass"]
})
export class UserTypeAddComponent implements OnInit {
  userTypeForm: FormGroup;
  nombre: string = "";
  activo: string = "";
  isLoadingResults = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addUserType(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/user-types"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
    this.userTypeForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      activo: [null, Validators.required]
    });
  }
}
