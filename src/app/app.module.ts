import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClientsComponent } from "./client/clients/clients.component";
import { ClientDetailComponent } from "./client/client-detail/client-detail.component";
import { ClientAddComponent } from "./client/client-add/client-add.component";
import { ClientEditComponent } from "./client/client-edit/client-edit.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule
} from "@angular/material";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { DocumentTypesComponent } from "./document-type/document-types/document-types.component";
import { DocumentTypeAddComponent } from "./document-type/document-type-add/document-type-add.component";
import { DocumentTypeDetailComponent } from "./document-type/document-type-detail/document-type-detail.component";
import { DocumentTypeEditComponent } from "./document-type/document-type-edit/document-type-edit.component";
import { UsersComponent } from "./user/users/users.component";
import { UserAddComponent } from "./user/user-add/user-add.component";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { UserTypesComponent } from "./user-type/user-types/user-types.component";
import { UserTypeAddComponent } from "./user-type/user-type-add/user-type-add.component";
import { UserTypeDetailComponent } from "./user-type/user-type-detail/user-type-detail.component";
import { UserTypeEditComponent } from "./user-type/user-type-edit/user-type-edit.component";
import { stateToHumanReadable } from "./utils/filters.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailComponent,
    ClientAddComponent,
    ClientEditComponent,
    DocumentTypesComponent,
    DocumentTypeAddComponent,
    DocumentTypeDetailComponent,
    DocumentTypeEditComponent,
    UsersComponent,
    UserAddComponent,
    UserDetailComponent,
    UserEditComponent,
    UserTypesComponent,
    UserTypeAddComponent,
    UserTypeDetailComponent,
    UserTypeEditComponent,
    stateToHumanReadable
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
