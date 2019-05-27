import { Component, OnInit } from '@angular/core';
import { Notebook } from "../notebook";
import { NotebookService } from "../notebook.service";
import { Note } from "../note";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  activeNotebook: Notebook;
  activeNote: Note;

  constructor(private notebookService: NotebookService) { }

  ngOnInit() {
    this.notebookService.findAll()
      .subscribe(notebooks => this.activeNotebook = notebooks[0]);
  }

  updateActiveNotebook(newActiveNotebook: Notebook) {
    this.activeNotebook = newActiveNotebook;
  }

  updateActiveNote(newActiveNote: Note) {
    this.activeNote = newActiveNote;
  }
}
