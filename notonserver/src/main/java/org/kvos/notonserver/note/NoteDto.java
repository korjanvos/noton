package org.kvos.notonserver.note;

public class NoteDto {
    private Long id;
    private String text;
    private Long notebookId;

    public NoteDto() {
    }

    public NoteDto(Long id, String text, Long notebookId) {
        this.id = id;
        this.text = text;
        this.notebookId = notebookId;
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

    public Long getNotebookId() {
        return notebookId;
    }

    public void setNotebookId(Long notebookId) {
        this.notebookId = notebookId;
    }
}
