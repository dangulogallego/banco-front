import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

export interface DocumentTypeElement {
  position: number;
  activo: string;
  nombre: string;
  tdocId: number;
}

@Component({
  selector: "app-document-types",
  templateUrl: "./document-types.component.html",
  styleUrls: ["./document-types.component.scss"]
})
export class DocumentTypesComponent implements OnInit {
  dataDocumentTypes = [];
  dataSource = null;
  isLoadingResults = true;

  ELEMENT_DATA: DocumentTypeElement[] = [];
  displayedColumns: string[] = ["position", "nombre", "tdocId", "activo", "accion"];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, private router: Router) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDatatable() {
    this.ELEMENT_DATA = this.dataDocumentTypes;
    this.dataSource = new MatTableDataSource<DocumentTypeElement>(
      this.ELEMENT_DATA
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterState(activo) {
    return activo === "S" ? "Activo" : "Inactivo";
  }

  deleteDocumentType(clieId) {
    this.isLoadingResults = true;
    this.api.deleteDocumentType(clieId).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/document-types"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  ngOnInit() {
    this.dataDocumentTypes = [];
    this.api.getDocumentTypes().subscribe(
      res => {
        if (res) {
          res.forEach((element, index) => {
            this.dataDocumentTypes.push({
              position: index + 1,
              nombre: element.nombre,
              activo: this.filterState(element.activo),
              tdocId: element.tdocId
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
