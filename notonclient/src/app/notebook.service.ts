import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Note } from "./note";
import { catchError } from "rxjs/operators";
import { Notebook } from "./notebook";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  private notebooksUrl = 'http://localhost:8080/api/notebooks';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.notebooksUrl).pipe(
      catchError(this.handleError<Notebook[]>('findAll', []))
    );
  }

  find(notebook: Notebook | number): Observable<Notebook> {
    const id = typeof notebook === 'number' ? notebook : notebook.id;
    const url = `${this.notebooksUrl}/${id}`;
    return this.http.get<Notebook>(url).pipe(
      catchError(this.handleError<Notebook>(`findNote id=${id}`))
    );
  }

  save(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.notebooksUrl, notebook, httpOptions).pipe(
      catchError(this.handleError<Notebook>('save'))
    );
  }

  update(notebook: Notebook): Observable<Notebook> {
    const url = `${this.notebooksUrl}/${notebook.id}`;
    return this.http.put<Notebook>(url, notebook, httpOptions).pipe(
      catchError(this.handleError<Notebook>('update'))
    );
  }

  delete(notebook: Notebook | number): Observable<{}> {
    const id = typeof notebook === 'number' ? notebook : notebook.id;
    const url = `${this.notebooksUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError<Notebook>('delete'))
    );
  }

  findNotes(notebook: Notebook | number): Observable<Note[]> {
    const id = typeof notebook === 'number' ? notebook : notebook.id;
    const url = `${this.notebooksUrl}/${id}/notes`;
    return this.http.get<Note[]>(url).pipe(
      catchError(this.handleError<Note[]>(`findNotes id=${id}`, []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
