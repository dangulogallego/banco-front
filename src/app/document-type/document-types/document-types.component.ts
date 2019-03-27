import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../api.service";
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
  styleUrls: ["./document-types.component.sass"]
})
export class DocumentTypesComponent implements OnInit {
  dataDocumentTypes = [];
  dataSource = null;
  isLoadingResults = true;

  ELEMENT_DATA: DocumentTypeElement[] = [];
  displayedColumns: string[] = ["position", "nombre", "activo"];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService) {}

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

  ngOnInit() {
    this.dataDocumentTypes = [];
    this.api.getDocumentTypes().subscribe(
      res => {
        if (res) {
          res.forEach((element, index) => {
            this.dataDocumentTypes.push({
              position: index,
              nombre: element.nombre,
              activo: element.activo,
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
