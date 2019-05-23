package org.kvos.notonserver.notebook;

import org.kvos.notonserver.note.Note;

import javax.persistence.*;
import java.util.Collections;
import java.util.List;

@Entity
public class Notebook {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @OneToMany(mappedBy = "notebook", cascade =  CascadeType.ALL)
    private List<Note> notes;

    public Notebook() {
    }

    public Notebook(String name) {
        this.name = name;
        this.notes = Collections.emptyList();
    }

    public Notebook(String name, List<Note> notes) {
        this.name = name;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }
}
