import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { Cliente } from "../../client";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-client-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: ["./client-detail.component.scss"]
})
export class ClientDetailComponent implements OnInit {
  client: Cliente = {
    clieId: 0,
    activo: "",
    direccion: "",
    email: "",
    nombre: "",
    telefono: "",
    tdocId: null
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

  getClientDetails(clieId) {
    this.api.getClient(clieId).subscribe(data => {
      this.client = data;
      this.isLoadingResults = false;
    });
  }

  deleteClient(clieId) {
    this.isLoadingResults = true;
    this.api.deleteClient(clieId).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/clients"]);
      },
      err => {
        this.snackBar.open(
          "El cliente no ha sido eliminado; Es posible que tenga cuentas asociadas.",
          "Entendido"
        );
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
    this.getClientDetails(this.route.snapshot.params["clieId"]);
  }
}
