import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.sass"]
})
export class UserEditComponent implements OnInit {
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
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  getUser(usuUsuario) {
    this.api.getUser(usuUsuario).subscribe(data => {
      this.usuUsuario = data.usuUsuario;
      this.userForm.setValue({
        usuUsuario: data.usuUsuario,
        activo: data.activo,
        clave: data.clave,
        identificacion: data.identificacion,
        nombre: data.nombre,
        tiusId: data.tiusId
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateUser(this.usuUsuario, form).subscribe(
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
    this.getUser(this.route.snapshot.params["usuUsuario"]);
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
