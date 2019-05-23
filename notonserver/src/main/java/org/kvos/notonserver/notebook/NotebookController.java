package org.kvos.notonserver.notebook;

import org.kvos.notonserver.note.Note;
import org.kvos.notonserver.note.NoteDto;
import org.kvos.notonserver.note.NoteMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notebooks")
@CrossOrigin(origins = "http://localhost:4200")
class NotebookController {
    private final NotebookRepository notebookRepository;
    private final NotebookMapper notebookMapper;
    private final NoteMapper noteMapper;

    public NotebookController(NotebookRepository notebookRepository, NotebookMapper notebookMapper, NoteMapper noteMapper) {
        this.notebookRepository = notebookRepository;
        this.notebookMapper = notebookMapper;
        this.noteMapper = noteMapper;
    }

    @GetMapping
    List<NotebookDto> findAll() {
        List<Notebook> notebooks = notebookRepository.findAll();

        return notebookMapper.convertToDto(notebooks);
    }

    @GetMapping("/{id}")
    NotebookDto findById(@PathVariable Long id) {
        Notebook notebook = notebookRepository.findById(id)
                .orElseThrow(() -> new NotebookNotFoundException(id));

        return notebookMapper.convertToDto(notebook);
    }

    @PostMapping
    NotebookDto save(@RequestBody NotebookDto notebookDto) {
        Notebook notebook = notebookMapper.convertToEntity(notebookDto);
        Notebook savedNotebook = notebookRepository.save(notebook);

        return notebookMapper.convertToDto(savedNotebook);
    }

    @PutMapping("/{id}")
    NotebookDto update(@RequestBody NotebookDto newNotebookDto, @PathVariable Long id) {
        Notebook newNotebook = notebookMapper.convertToEntity(newNotebookDto);
        Notebook savedNotebook = notebookRepository.findById(id)
                .map(notebook -> {
                    notebook.setName(newNotebook.getName());
                    return notebookRepository.save(notebook);
                })
                .orElseThrow(() -> new NotebookNotFoundException(id));

        return notebookMapper.convertToDto(savedNotebook);

    }

    @DeleteMapping("/{id}")
    void deleteById(@PathVariable Long id) {
        if (!notebookRepository.existsById(id)) {
            throw new NotebookNotFoundException(id);
        }
        notebookRepository.deleteById(id);
    }

    @GetMapping("/{id}/notes")
    List<NoteDto> findNotesById(@PathVariable Long id) {
        Notebook notebook = notebookRepository.findById(id)
                .orElseThrow(() -> new NotebookNotFoundException(id));
        List<Note> notes = notebook.getNotes();

        return noteMapper.convertToDto(notes);
    }
}
