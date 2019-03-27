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
  selector: "app-client-add",
  templateUrl: "./client-add.component.html",
  styleUrls: ["./client-add.component.sass"]
})
export class ClientAddComponent implements OnInit {
  clientForm: FormGroup;
  activo: string = "";
  direccion: string = "";
  email: string = "";
  nombre: string = "";
  telefono: string = "";
  tdocId: number = 0;
  isLoadingResults = false;
  documentTypes: TipoDocumento[] = [];

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addClient(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/clients"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  maysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit() {
    this.api.getDocumentTypes().subscribe(
      res => {
        if (res) {
          res.forEach((element, index) => {
            this.documentTypes.push({
              tdocId: element.tdocId,
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
    this.clientForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      direccion: [null, Validators.required],
      telefono: [null, Validators.required],
      activo: [null, Validators.required],
      tdocId: [null, Validators.required]
    });
  }
}
