import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Note } from "../note";
import { NoteService } from "../note.service";
import { NotebookService } from "../notebook.service";
import { Notebook } from "../notebook";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnChanges {
  @Input() notebook: Notebook;
  @Output('newActiveNote') activeNoteEmitter = new EventEmitter<Note>();

  private notes: Note[];

  constructor(private noteService: NoteService, private notebookService: NotebookService) {
  }

  ngOnChanges() {
    this.findNotes();
  }

  findNotes() {
    let noteBookId = this.notebook.id;
    this.notebookService.findNotes(noteBookId)
      .subscribe((newNotes => this.notes = newNotes));
  }

  saveNote() {
    let noteBookId = this.notebook.id;
    this.noteService.save({text: '', notebookId: noteBookId} as Note)
      .subscribe(newNote => this.notes.push(newNote));
  }

  deleteNote(note: Note) {
    this.noteService.delete(note)
      .subscribe(() => this.notes = this.notes.filter(n => n.id !== note.id));
  }

  updateNote(id: number, text: string) {
    let notebookId = this.notebook.id;
    let newNote = new Note(id, text, notebookId);
    this.noteService.update(newNote)
      .subscribe(returnedNote => {
        let index = this.notes.map(note => note.id).indexOf(returnedNote.id);
        if (index !== -1) {
          this.notes[index] = returnedNote;
          this.activeNoteEmitter.emit(returnedNote);
        }
      })
  }

  updateActiveNote(note: Note) {
    this.activeNoteEmitter.emit(note);
  }
}
