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
  selector: "app-document-type-edit",
  templateUrl: "./document-type-edit.component.html",
  styleUrls: ["./document-type-edit.component.sass"]
})
export class DocumentTypeEditComponent implements OnInit {
  documentTypeForm: FormGroup;
  tdocId: number = 0;
  nombre: string = "";
  activo: string = "";
  isLoadingResults = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  getDocumentType(tdocId) {
    this.api.getDocumentType(tdocId).subscribe(data => {
      this.tdocId = data.tdocId;
      this.documentTypeForm.setValue({
        tdocId: data.tdocId,
        activo: data.activo,
        nombre: data.nombre
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateDocumentType(this.tdocId, form).subscribe(
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
    this.getDocumentType(this.route.snapshot.params["tdocId"]);
    this.documentTypeForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      activo: [null, Validators.required],
      tdocId: [null, Validators.required]
    });
  }
}
