import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { Usuario } from "../../user";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.sass"]
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
    private router: Router
  ) {}

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
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
    this.getUserDetails(this.route.snapshot.params["usuUsuario"]);
  }
}
