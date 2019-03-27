import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../api.service";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

export interface UserTypeElement {
  position: number;
  tiusId: number;
  activo: string;
  nombre: string;
}

@Component({
  selector: "app-user-types",
  templateUrl: "./user-types.component.html",
  styleUrls: ["./user-types.component.sass"]
})
export class UserTypesComponent implements OnInit {
  dataUserTypes = [];
  dataSource = null;
  isLoadingResults = true;

  ELEMENT_DATA: UserTypeElement[] = [];
  displayedColumns: string[] = ["position", "nombre", "activo"];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDatatable() {
    this.ELEMENT_DATA = this.dataUserTypes;
    this.dataSource = new MatTableDataSource<UserTypeElement>(
      this.ELEMENT_DATA
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataUserTypes = [];
    this.api.getUserTypes().subscribe(
      res => {
        if (res) {
          res.forEach((element, index) => {
            this.dataUserTypes.push({
              position: index,
              tiusId: element.tiusId,
              activo: element.activo,
              nombre: element.nombre
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
