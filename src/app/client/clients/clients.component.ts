import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { Cliente } from "../../client";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";
import { MatSnackBar } from "@angular/material";

export interface ClientElement {
  position: number;
  nombre: string;
  email: string;
  telefono: string;
  clieId: number;
  activo: string;
  direccion: string;
}

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"]
})
export class ClientsComponent implements OnInit {
  dataClients = [];
  dataSource = null;
  isLoadingResults = true;

  ELEMENT_DATA: ClientElement[] = [];
  displayedColumns: string[] = [
    "position",
    "nombre",
    "clieId",
    "email",
    "telefono",
    "direccion",
    "activo",
    "accion"
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDatatable() {
    this.ELEMENT_DATA = this.dataClients;
    this.dataSource = new MatTableDataSource<ClientElement>(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  filterState(activo) {
    return activo === "S" ? "Activo" : "Inactivo";
  }

  ngOnInit() {
    this.dataClients = [];
    this.api.getClients().subscribe(
      res => {
        if (res) {
          res.forEach((element, index) => {
            this.dataClients.push({
              position: index + 1,
              nombre: element.nombre,
              email: element.email,
              telefono: element.telefono,
              clieId: element.clieId,
              activo: this.filterState(element.activo),
              direccion: element.direccion
            });
          });
          this.showDatatable();
        }
        this.isLoadingResults = false;
      },
      err => {
        this.isLoadingResults = false;
      }
    );
  }
}
