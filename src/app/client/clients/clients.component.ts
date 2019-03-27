import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../api.service";
import { Cliente } from "../../client";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

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
  styleUrls: ["./clients.component.sass"]
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
    "activo"
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDatatable() {
    this.ELEMENT_DATA = this.dataClients;
    this.dataSource = new MatTableDataSource<ClientElement>(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
