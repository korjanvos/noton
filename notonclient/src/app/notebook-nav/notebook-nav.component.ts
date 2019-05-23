import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Notebook } from "../notebook";
import { NotebookService } from "../notebook.service";

@Component({
  selector: 'app-notebook-nav',
  templateUrl: './notebook-nav.component.html',
  styleUrls: ['./notebook-nav.component.css']
})
export class NotebookNavComponent implements OnInit {
  @Output('newActiveNotebook') activeNotebookEmitter = new EventEmitter<Notebook>();

  private notebooks: Notebook[];

  constructor(private notebookService: NotebookService) { }

  ngOnInit() {
    this.findNotebooks();
  }

  findNotebooks() {
    this.notebookService.findAll()
      .subscribe((newNotebooks => this.notebooks = newNotebooks));
  }

  saveNotebook() {
    this.notebookService.save({name: ''} as Notebook)
      .subscribe(newNotebook => this.notebooks.push(newNotebook));
  }

  deleteNotebook(notebook: Notebook) {
    this.notebookService.delete(notebook)
      .subscribe(() => this.notebooks = this.notebooks.filter(n => n.id !== notebook.id));
  }

  updateNotebook(id: number, name: string) {
    let newNotebook = new Notebook(id, name);
    this.notebookService.update(newNotebook)
      .subscribe(returnedNotebook => {
        let index = this.notebooks.map(note => note.id).indexOf(returnedNotebook.id);
        this.notebooks[index] = returnedNotebook;
      })
  }

  updateActiveNotebook(notebook: Notebook) {
    this.activeNotebookEmitter.emit(notebook);
  }
}
