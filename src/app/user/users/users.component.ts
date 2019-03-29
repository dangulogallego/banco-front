import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";
import { MatSnackBar } from "@angular/material";

export interface UserElement {
  position: number;
  usuUsuario: string;
  activo: string;
  clave: string;
  identificacion: number;
  nombre: string;
  tiusId: number;
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  dataUsers = [];
  dataSource = null;
  isLoadingResults = true;

  ELEMENT_DATA: UserElement[] = [];
  displayedColumns: string[] = [
    "position",
    "nombre",
    "usuUsuario",
    "identificacion",
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
    this.ELEMENT_DATA = this.dataUsers;
    this.dataSource = new MatTableDataSource<UserElement>(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterState(activo) {
    return activo === "S" ? "Activo" : "Inactivo";
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
    this.dataUsers = [];
    this.api.getUsers().subscribe(
      res => {
        if (res) {
          res.forEach((element, index) => {
            this.dataUsers.push({
              position: index + 1,
              usuUsuario: element.usuUsuario,
              activo: this.filterState(element.activo),
              clave: element.clave,
              identificacion: element.identificacion,
              nombre: element.nombre,
              tiusId: element.tiusId
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
