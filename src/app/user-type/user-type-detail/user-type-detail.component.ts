import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { TipoUsuario } from "../../userType";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-user-type-detail",
  templateUrl: "./user-type-detail.component.html",
  styleUrls: ["./user-type-detail.component.scss"]
})
export class UserTypeDetailComponent implements OnInit {
  userType: TipoUsuario = {
    tiusId: 0,
    activo: "",
    nombre: ""
  };
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  getUserTypeDetails(tiusId) {
    this.api.getUserType(tiusId).subscribe(data => {
      this.userType = data;
      this.isLoadingResults = false;
    });
  }

  deleteUserType(tiusId) {
    this.isLoadingResults = true;
    this.api.deleteUserType(tiusId).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/user-types"]);
      },
      err => {
        this.snackBar.open(
          "El tipo de usuario no ha sido eliminado; Es posible que se encuentre asociado a uno o más usuarios.",
          "Entendido"
        );
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
    this.getUserTypeDetails(this.route.snapshot.params["tiusId"]);
  }
}
