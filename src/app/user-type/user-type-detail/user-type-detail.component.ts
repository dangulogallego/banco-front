import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { TipoUsuario } from "../../userType";

@Component({
  selector: "app-user-type-detail",
  templateUrl: "./user-type-detail.component.html",
  styleUrls: ["./user-type-detail.component.sass"]
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
    private router: Router
  ) {}

  getUserTypeDetails(tiusId) {
    this.api.getUserType(tiusId).subscribe(data => {
      console.log(data);

      this.userType = data;
      this.isLoadingResults = false;
    });
  }

  deleteDocumentType(tiusId) {
    this.isLoadingResults = true;
    this.api.deleteUserType(tiusId).subscribe(
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
    this.getUserTypeDetails(this.route.snapshot.params["tiusId"]);
  }
}
