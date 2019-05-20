import { Component, OnInit } from '@angular/core';
import { Note } from "../note";
import { NoteService } from "../note.service";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  private notes: Note[];

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.findNotes();
  }

  findNotes() {
    this.noteService.findAll()
      .subscribe(newNotes => this.notes = newNotes);
  }

  saveNote() {
    this.noteService.save({text: ''} as Note)
      .subscribe(newNote => this.notes.push(newNote));
  }

  deleteNote(note: Note) {
    console.log('delete ' + note.id)
    this.noteService.delete(note)
      .subscribe(() => this.notes = this.notes.filter(n => n.id !== note.id));
  }

  updateNote(id: number, text: string) {
    let note = new Note(id, text);
    this.noteService.update(note)
      .subscribe(newNote => {
        let index = this.notes.map(note => note.id).indexOf(newNote.id);
        this.notes[index] = newNote;
      })
  }
}