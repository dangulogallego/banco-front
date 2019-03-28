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
  selector: "app-user-type-edit",
  templateUrl: "./user-type-edit.component.html",
  styleUrls: ["./user-type-edit.component.scss"]
})
export class UserTypeEditComponent implements OnInit {
  userTypeForm: FormGroup;
  tiusId: number = 0;
  nombre: string = "";
  activo: string = "";
  isLoadingResults = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  getUserType(tiusId) {
    this.api.getUserType(tiusId).subscribe(data => {
      this.tiusId = data.tiusId;
      this.userTypeForm.setValue({
        tiusId: data.tiusId,
        activo: data.activo,
        nombre: data.nombre
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateUserType(this.tiusId, form).subscribe(
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
    this.getUserType(this.route.snapshot.params["tiusId"]);
    this.userTypeForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      activo: [null, Validators.required],
      tiusId: [null, Validators.required]
    });
  }
}
