import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "./client/clients/clients.component";
import { ClientDetailComponent } from "./client/client-detail/client-detail.component";
import { ClientAddComponent } from "./client/client-add/client-add.component";
import { ClientEditComponent } from "./client/client-edit/client-edit.component";
import { DocumentTypesComponent } from "./document-type/document-types/document-types.component";
import { DocumentTypeDetailComponent } from "./document-type/document-type-detail/document-type-detail.component";
import { DocumentTypeAddComponent } from "./document-type/document-type-add/document-type-add.component";
import { DocumentTypeEditComponent } from "./document-type/document-type-edit/document-type-edit.component";
import { UsersComponent } from "./user/users/users.component";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { UserAddComponent } from "./user/user-add/user-add.component";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { UserTypesComponent } from "./user-type/user-types/user-types.component";
import { UserTypeDetailComponent } from "./user-type/user-type-detail/user-type-detail.component";
import { UserTypeAddComponent } from "./user-type/user-type-add/user-type-add.component";
import { UserTypeEditComponent } from "./user-type/user-type-edit/user-type-edit.component";

const routes: Routes = [
  {
    path: "clients",
    component: ClientsComponent,
    data: { title: "Lista de Clientes" }
  },
  {
    path: "client-details/:clieId",
    component: ClientDetailComponent,
    data: { title: "Detalle del Cliente" }
  },
  {
    path: "client-add",
    component: ClientAddComponent,
    data: { title: "Añadir Cliente" }
  },
  {
    path: "client-edit/:clieId",
    component: ClientEditComponent,
    data: { title: "Editar Cliente" }
  },
  {
    path: "document-types",
    component: DocumentTypesComponent,
    data: { title: "Lista de Tipos de Documentos" }
  },
  {
    path: "document-type-details/:tdocId",
    component: DocumentTypeDetailComponent,
    data: { title: "Detalle del Tipo de Documento" }
  },
  {
    path: "document-type-add",
    component: DocumentTypeAddComponent,
    data: { title: "Añadir Tipo de Documento" }
  },
  {
    path: "document-type-edit/:tdocId",
    component: DocumentTypeEditComponent,
    data: { title: "Editar Tipo de Documento" }
  },
  {
    path: "users",
    component: UsersComponent,
    data: { title: "Lista de Usuarios" }
  },
  {
    path: "user-details/:usuUsuario",
    component: UserDetailComponent,
    data: { title: "Detalle del Usuario" }
  },
  {
    path: "user-add",
    component: UserAddComponent,
    data: { title: "Añadir Usuario" }
  },
  {
    path: "user-edit/:usuUsuario",
    component: UserEditComponent,
    data: { title: "Editar Usuario" }
  },
  {
    path: "user-types",
    component: UserTypesComponent,
    data: { title: "Lista de Tipos de Usuarios" }
  },
  {
    path: "user-type-details/:tiusId",
    component: UserTypeDetailComponent,
    data: { title: "Detalle del Tipo de Usuario" }
  },
  {
    path: "user-type-add",
    component: UserTypeAddComponent,
    data: { title: "Añadir Tipo de Usuario" }
  },
  {
    path: "user-type-edit/:tiusId",
    component: UserTypeEditComponent,
    data: { title: "Editar Tipo de Usuario" }
  },
  { path: "", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
