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
const apiUrl = "http://127.0.0.1:8080/banco-rest/rest";

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

  addClient(client): Observable<Cliente> {
    return this.http
      .post<Cliente>(`${apiUrl}/cliente/`, client, httpOptions)
      .pipe(
        tap(_ => console.log(`added cliente`)),
        catchError(this.handleError<Cliente>("addClient"))
      );
  }

  updateClient(clieId, client): Observable<any> {
    const url = `${apiUrl}/cliente/`;
    return this.http.put(url, client, httpOptions).pipe(
      tap(_ => console.log(`updated client id=${clieId}`)),
      catchError(this.handleError<any>("updateClient"))
    );
  }

  deleteClient(clieId): Observable<Cliente> {
    const url = `${apiUrl}/cliente/${clieId}`;
    return this.http.delete<Cliente>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted client id=${clieId}`)),
      catchError(this.handleError<Cliente>("deleteClient"))
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

  addDocumentType(documentType): Observable<TipoDocumento> {
    return this.http
      .post<TipoDocumento>(
        `${apiUrl}/tipo-documento/`,
        documentType,
        httpOptions
      )
      .pipe(
        tap(_ => console.log(`added documentType`)),
        catchError(this.handleError<TipoDocumento>("addDocumentType"))
      );
  }

  updateDocumentType(tdocId, documentType): Observable<any> {
    const url = `${apiUrl}/tipo-documento/`;
    return this.http.put(url, documentType, httpOptions).pipe(
      tap(_ => console.log(`updated documentType id=${tdocId}`)),
      catchError(this.handleError<any>("updateDocumentType"))
    );
  }

  deleteDocumentType(tdocId): Observable<TipoDocumento> {
    const url = `${apiUrl}/tipo-documento/${tdocId}`;
    return this.http.delete<TipoDocumento>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted documentType id=${tdocId}`)),
      catchError(this.handleError<TipoDocumento>("deleteDocumentType"))
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

  addUser(user): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${apiUrl}/usuario/`, user, httpOptions)
      .pipe(
        tap(_ => console.log(`added usuario`)),
        catchError(this.handleError<Usuario>("addUser"))
      );
  }

  updateUser(usuUsuario, usuario): Observable<any> {
    const url = `${apiUrl}/usuario/`;
    return this.http.put(url, usuario, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${usuUsuario}`)),
      catchError(this.handleError<any>("updateUser"))
    );
  }

  deleteUser(usuUsuario): Observable<Usuario> {
    const url = `${apiUrl}/usuario/${usuUsuario}`;
    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user usuUsuario=${usuUsuario}`)),
      catchError(this.handleError<Usuario>("deleteUser"))
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

  addUserType(userType): Observable<TipoUsuario> {
    return this.http
      .post<TipoUsuario>(`${apiUrl}/tipo-usuario/`, userType, httpOptions)
      .pipe(
        tap(_ => console.log(`added userType`)),
        catchError(this.handleError<TipoUsuario>("addUserType"))
      );
  }

  updateUserType(tiusId, userType): Observable<any> {
    console.log(tiusId);
    console.log(userType);
    const url = `${apiUrl}/tipo-usuario/`;
    return this.http.put(url, userType, httpOptions).pipe(
      tap(_ => console.log(`updated userType id=${tiusId}`)),
      catchError(this.handleError<any>("updateUserType"))
    );
  }

  deleteUserType(tiusId): Observable<TipoUsuario> {
    const url = `${apiUrl}/tipo-usuario/${tiusId}`;
    return this.http.delete<TipoUsuario>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user tiusId=${tiusId}`)),
      catchError(this.handleError<TipoUsuario>("deleteUserType"))
    );
  }
}
