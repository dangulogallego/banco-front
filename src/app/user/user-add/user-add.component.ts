import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { TipoUsuario } from "../../userType";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"]
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  usuUsuario: string = "";
  activo: string = "";
  activoSelect: object[] = [
    { value: "S", name: "Activo" },
    { value: "N", name: "Inactivo" }
  ];
  clave: string = "";
  identificacion: number = 0;
  nombre: string = "";
  tiusId: number = 0;
  isLoadingResults = false;
  userTypes: TipoUsuario[] = [];

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
    this.api.addUser(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/users"]);
      },
      err => {
        this.snackBar.open(err.error + "", "Entendido");
        this.isLoadingResults = false;
      }
    );
  }

  maysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit() {
    this.api.getUserTypes().subscribe(
      res => {
        if (res) {
          res.forEach((element, index) => {
            this.userTypes.push({
              tiusId: element.tiusId,
              nombre: this.maysPrimera(element.nombre.toLowerCase()),
              activo: element.activo
            });
          });
        }
      },
      err => {
        this.isLoadingResults = false;
      }
    );
    this.userForm = this.formBuilder.group({
      usuUsuario: [null, Validators.required],
      nombre: [null, Validators.required],
      tiusId: [null, Validators.required],
      identificacion: [null, Validators.required],
      clave: [null, Validators.required],
      activo: [null, Validators.required]
    });
  }
}
