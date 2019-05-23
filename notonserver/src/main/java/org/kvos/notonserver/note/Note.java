package org.kvos.notonserver.note;

import org.kvos.notonserver.notebook.Notebook;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Note {
    @Id
    @GeneratedValue
    private Long id;

    private String text;

    @ManyToOne
    private Notebook notebook;

    public Note() {
    }

    public Note(String text, Notebook notebook) {
        this.text = text;
        this.notebook = notebook;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Notebook getNotebook() {
        return notebook;
    }

    public void setNotebook(Notebook notebook) {
        this.notebook = notebook;
    }

    @Override
    public String toString() {
        return "note{" +
                "id=" + id +
                ", text='" + text + '\'' +
                '}';
    }

}
