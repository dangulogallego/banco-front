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
  selector: "app-client-edit",
  templateUrl: "./client-edit.component.html",
  styleUrls: ["./client-edit.component.sass"]
})
export class ClientEditComponent implements OnInit {
  clientForm: FormGroup;
  clieId: number = 0;
  activo: string = "";
  direccion: string = "";
  email: string = "";
  nombre: string = "";
  telefono: string = "";
  tdocId: number = 0;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  getClient(clieId) {
    this.api.getClient(clieId).subscribe(data => {
      this.clieId = data.clieId;
      this.clientForm.setValue({
        nombre: data.nombre,
        email: data.email,
        direccion: data.direccion,
        telefono: data.telefono,
        activo: data.activo,
        tdocId: data.tdocId
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateClient(this.clieId, form).subscribe(
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

  clientDetails() {
    this.router.navigate(["/client-details", this.clieId]);
  }

  ngOnInit() {
    this.getClient(this.route.snapshot.params["clieId"]);
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
