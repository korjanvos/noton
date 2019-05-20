import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from "../note";
import { Observable, Subject } from "rxjs";
import { auditTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() note: Note;
  @Output('newNote') newNoteEmitter = new EventEmitter<Note>();

  potentialNewNote = new Subject<Note>();
  newNote: Observable<Note>;

  constructor() {
  }

  ngOnInit() {
    this.newNote = this.potentialNewNote.pipe(
      auditTime(5000),
      distinctUntilChanged()
    );

    this.newNote.subscribe(note => this.newNoteEmitter.emit(note))
  }

  addPotentialNewNote(noteId: number, noteText: string) {
    let note = new Note(noteId, noteText);
    this.potentialNewNote.next(note);
  }

}
