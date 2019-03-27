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

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.sass"]
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  usuUsuario: string = "";
  activo: string = "";
  clave: string = "";
  identificacion: number = 0;
  nombre: string = "";
  tiusId: number = 0;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addUser(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/users"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
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
