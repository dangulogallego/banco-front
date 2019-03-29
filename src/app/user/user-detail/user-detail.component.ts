import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { Usuario } from "../../user";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  user: Usuario = {
    usuUsuario: "",
    activo: "",
    clave: "",
    identificacion: 0,
    nombre: "",
    tiusId: 0
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

  getUserDetails(usuUsuario) {
    this.api.getUser(usuUsuario).subscribe(data => {
      this.user = data;
      this.isLoadingResults = false;
    });
  }

  deleteUser(usuUsuario) {
    this.isLoadingResults = true;
    this.api.deleteUser(usuUsuario).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/users"]);
      },
      err => {
        this.snackBar.open(
          "El usuario no ha sido eliminado; Es posible que tenga transacciones asociadas.",
          "Entendido"
        );
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
    this.getUserDetails(this.route.snapshot.params["usuUsuario"]);
  }
}
