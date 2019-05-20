package org.kvos.notonserver.Note;

import javax.persistence.*;

@Entity
public class Note {
    @Id
    @GeneratedValue
    private Long id;
    private String text;

    public Note() {
    }

    public Note(String text) {
        this.text = text;
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

    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", text='" + text + '\'' +
                '}';
    }
}
