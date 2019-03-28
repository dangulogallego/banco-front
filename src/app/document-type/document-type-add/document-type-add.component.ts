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
  selector: "app-document-type-add",
  templateUrl: "./document-type-add.component.html",
  styleUrls: ["./document-type-add.component.scss"]
})
export class DocumentTypeAddComponent implements OnInit {
  documentTypeForm: FormGroup;
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
    this.api.addDocumentType(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/document-types"]);
      },
      err => {
        this.snackBar.open(err.error + "", "Entendido");
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
    this.documentTypeForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      activo: [null, Validators.required]
    });
  }
}
