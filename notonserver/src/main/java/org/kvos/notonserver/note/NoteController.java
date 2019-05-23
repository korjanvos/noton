package org.kvos.notonserver.note;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:4200")
class NoteController {
    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;

    public NoteController(NoteRepository noteRepository, NoteMapper noteMapper) {
        this.noteRepository = noteRepository;
        this.noteMapper = noteMapper;
    }

    @GetMapping
    List<NoteDto> findAll() {
        List<Note> notes = noteRepository.findAll();

        return noteMapper.convertToDto(notes);
    }

    @GetMapping("/{id}")
    NoteDto findById(@PathVariable Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));

        return noteMapper.convertToDto(note);
    }

    @PostMapping
    NoteDto save(@RequestBody NoteDto noteDto) {
        Note note = noteMapper.convertToEntity(noteDto);
        Note savedNote = noteRepository.save(note);

        return noteMapper.convertToDto(savedNote);
    }

    @PutMapping("/{id}")
    NoteDto update(@RequestBody NoteDto newNoteDto, @PathVariable Long id) {
        Note newNote = noteMapper.convertToEntity(newNoteDto);
        Note savedNote = noteRepository.findById(id)
                .map(note -> {
                    note.setText(newNote.getText());
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new NoteNotFoundException(id));

        return noteMapper.convertToDto(savedNote);
    }

    @DeleteMapping("/{id}")
    void deleteById(@PathVariable Long id) {
        if (!noteRepository.existsById(id)) {
            throw new NoteNotFoundException(id);
        }
        noteRepository.deleteById(id);
    }
}
