export class Note {
  id: number;
  text: string;
  notebookId: number;

  constructor(id: number, text: string, notebookId: number) {
    this.id = id;
    this.text = text;
    this.notebookId = notebookId;
  }
}
