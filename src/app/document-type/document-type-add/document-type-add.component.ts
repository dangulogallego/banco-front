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
  selector: "app-document-type-add",
  templateUrl: "./document-type-add.component.html",
  styleUrls: ["./document-type-add.component.sass"]
})
export class DocumentTypeAddComponent implements OnInit {
  documentTypeForm: FormGroup;
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
    this.api.addDocumentType(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/document-types"]);
      },
      err => {
        console.log(err);
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
