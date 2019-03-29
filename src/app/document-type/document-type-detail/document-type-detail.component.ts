import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { TipoDocumento } from "../../documentType";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-document-type-detail",
  templateUrl: "./document-type-detail.component.html",
  styleUrls: ["./document-type-detail.component.scss"]
})
export class DocumentTypeDetailComponent implements OnInit {
  typeDocument: TipoDocumento = {
    tdocId: 0,
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

  getDocumentTypeDetails(tdocId) {
    this.api.getDocumentType(tdocId).subscribe(data => {
      this.typeDocument = data;
      this.isLoadingResults = false;
    });
  }

  deleteDocumentType(clieId) {
    this.isLoadingResults = true;
    this.api.deleteDocumentType(clieId).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/document-types"]);
      },
      err => {
        this.snackBar.open(
          "El tipo de documento no ha sido eliminado; Es posible que esté asociado a uno o más clientes.",
          "Entendido"
        );
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
    this.getDocumentTypeDetails(this.route.snapshot.params["tdocId"]);
  }
}
