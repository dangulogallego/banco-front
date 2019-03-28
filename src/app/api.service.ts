import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Cliente } from "./client";
import { Usuario } from "./user";
import { TipoDocumento } from "./documentType";
import { TipoUsuario } from "./userType";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://192.168.1.103:8080/banco-rest/rest";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  // --------------- Cliente -----------------
  getClients(): Observable<any> {
    return this.http.get(`${apiUrl}/cliente/`);
  }

  getClient(clieId: number): Observable<Cliente> {
    const url = `${apiUrl}/cliente/${clieId}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`fetched cliente clieId=${clieId}`)),
      catchError(this.handleError<Cliente>(`getClient id=${clieId}`))
    );
  }

  addClient(client): Observable<any> {
    return this.http
      .post(`${apiUrl}/cliente/`, client, { responseType: "text" })
      .pipe(tap(_ => console.log(`added cliente`)));
  }

  updateClient(clieId, client): Observable<any> {
    const url = `${apiUrl}/cliente/`;
    return this.http
      .put(url, client, { responseType: "text" })
      .pipe(tap(_ => console.log(`updated client id=${clieId}`)));
  }

  deleteClient(clieId): Observable<any> {
    const url = `${apiUrl}/cliente/${clieId}`;
    return this.http.delete(url, { responseType: "text" }).pipe(
      tap(_ => console.log(`deleted client id=${clieId}`)),
      catchError(this.handleError("deleteClient"))
    );
  }

  // --------------- Tipo Documentos -------------
  getDocumentTypes(): Observable<any> {
    return this.http.get(`${apiUrl}/tipo-documento/`);
  }

  getDocumentType(tdocId: number): Observable<TipoDocumento> {
    const url = `${apiUrl}/tipo-documento/${tdocId}`;
    return this.http.get<TipoDocumento>(url).pipe(
      tap(_ => console.log(`fetched TipoDocumento tdocId=${tdocId}`)),
      catchError(
        this.handleError<TipoDocumento>(`getTypeDocument id=${tdocId}`)
      )
    );
  }

  addDocumentType(documentType): Observable<any> {
    return this.http
      .post(`${apiUrl}/tipo-documento/`, documentType, { responseType: "text" })
      .pipe(tap(_ => console.log(`added documentType`)));
  }

  updateDocumentType(tdocId, documentType): Observable<any> {
    const url = `${apiUrl}/tipo-documento/`;
    return this.http
      .put(url, documentType, { responseType: "text" })
      .pipe(tap(_ => console.log(`updated documentType id=${tdocId}`)));
  }

  deleteDocumentType(tdocId): Observable<any> {
    const url = `${apiUrl}/tipo-documento/${tdocId}`;
    return this.http.delete(url, { responseType: "text" }).pipe(
      tap(_ => console.log(`deleted documentType id=${tdocId}`)),
      catchError(this.handleError("deleteDocumentType"))
    );
  }

  // -------------- Usuario ---------------
  getUsers(): Observable<any> {
    return this.http.get(`${apiUrl}/usuario/`);
  }

  getUser(usuUsuario: string): Observable<Usuario> {
    const url = `${apiUrl}/usuario/${usuUsuario}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log(`fetched usuario usuUsuario=${usuUsuario}`)),
      catchError(this.handleError<Usuario>(`getUser usuUsuario=${usuUsuario}`))
    );
  }

  addUser(user): Observable<any> {
    return this.http
      .post(`${apiUrl}/usuario/`, user, { responseType: "text" })
      .pipe(tap(_ => console.log(`added usuario`)));
  }

  updateUser(usuUsuario, usuario): Observable<any> {
    const url = `${apiUrl}/usuario/`;
    return this.http
      .put(url, usuario, { responseType: "text" })
      .pipe(tap(_ => console.log(`updated user id=${usuUsuario}`)));
  }

  deleteUser(usuUsuario): Observable<any> {
    const url = `${apiUrl}/usuario/${usuUsuario}`;
    return this.http.delete(url, { responseType: "text" }).pipe(
      tap(_ => console.log(`deleted user usuUsuario=${usuUsuario}`)),
      catchError(this.handleError("deleteUser"))
    );
  }

  // -------------- Tipo Usuario ---------------
  getUserTypes(): Observable<any> {
    return this.http.get(`${apiUrl}/tipo-usuario/`);
  }

  getUserType(tiusId: number): Observable<TipoUsuario> {
    const url = `${apiUrl}/tipo-usuario/${tiusId}`;
    return this.http.get<TipoUsuario>(url).pipe(
      tap(_ => console.log(`fetched TipoUsuario tiusId=${tiusId}`)),
      catchError(this.handleError<TipoUsuario>(`getUserType id=${tiusId}`))
    );
  }

  addUserType(userType): Observable<any> {
    return this.http
      .post(`${apiUrl}/tipo-usuario/`, userType, { responseType: "text" })
      .pipe(tap(_ => console.log(`added userType`)));
  }

  updateUserType(tiusId, userType): Observable<any> {
    const url = `${apiUrl}/tipo-usuario/`;
    return this.http
      .put(url, userType, { responseType: "text" })
      .pipe(tap(_ => console.log(`updated userType id=${tiusId}`)));
  }

  deleteUserType(tiusId): Observable<any> {
    const url = `${apiUrl}/tipo-usuario/${tiusId}`;
    return this.http.delete(url, { responseType: "text" }).pipe(
      tap(_ => console.log(`deleted user tiusId=${tiusId}`)),
      catchError(this.handleError("deleteUserType"))
    );
  }
}
