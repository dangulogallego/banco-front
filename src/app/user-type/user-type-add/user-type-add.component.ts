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
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-user-type-add",
  templateUrl: "./user-type-add.component.html",
  styleUrls: ["./user-type-add.component.scss"]
})
export class UserTypeAddComponent implements OnInit {
  userTypeForm: FormGroup;
  nombre: string = "";
  activo: string = "";
  activoSelect: object[] = [
    { value: "S", name: "Activo" },
    { value: "N", name: "Inactivo" }
  ];
  isLoadingResults = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addUserType(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/user-types"]);
      },
      err => {
        this.snackBar.open(err.error + "", "Entendido");
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
