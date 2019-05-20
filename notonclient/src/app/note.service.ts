import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from "rxjs";
import {Note} from "./note";
import { catchError } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl).pipe(
      catchError(this.handleError<Note[]>('findAll', []))
    );
  }

  find(note: Note | number): Observable<Note> {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      catchError(this.handleError<Note>(`findNote id=${id}`))
    );
  }

  save(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, httpOptions).pipe(
      catchError(this.handleError<Note>('save'))
    );
  }

  update(note: Note): Observable<Note> {
    const url = `${this.notesUrl}/${note.id}`;
    return this.http.put<Note>(url, note, httpOptions).pipe(
      catchError(this.handleError<Note>('update'))
    );
  }

  delete(note: Note | number): Observable<{}> {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.notesUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError<Note>('delete'))
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
