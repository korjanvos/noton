package org.kvos.notonserver;

import org.kvos.notonserver.note.Note;
import org.kvos.notonserver.note.NoteRepository;
import org.kvos.notonserver.notebook.Notebook;
import org.kvos.notonserver.notebook.NotebookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    private final NotebookRepository notebookRepository;
    private final NoteRepository noteRepository;

    public DatabaseSeeder(NotebookRepository notebookRepository, NoteRepository noteRepository) {
        this.notebookRepository = notebookRepository;
        this.noteRepository = noteRepository;
    }

    @Override
    public void run(String... args) {
        Notebook firstNotebook = new Notebook("First Notebook");
        firstNotebook = notebookRepository.save(firstNotebook);
        noteRepository.save(new Note("First Note", firstNotebook));
    }
}
