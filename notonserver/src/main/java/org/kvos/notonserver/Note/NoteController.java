package org.kvos.notonserver.Note;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:4200")
class NoteController {
    @Autowired
    NoteRepository noteRepository;

    @GetMapping
    List<Note> findAll() {
        return noteRepository.findAll();
    }

    @GetMapping("/{id}")
    Note findById(@PathVariable Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
    }

    @PostMapping
    Note save(@RequestBody Note note) {
        return noteRepository.save(note);
    }

    @PutMapping("/{id}")
    Note update(@RequestBody Note newNote, @PathVariable Long id) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setText(newNote.getText());
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new NoteNotFoundException(id));

    }

    @DeleteMapping("/{id}")
    void deleteById(@PathVariable Long id) {
        if (!noteRepository.existsById(id)) {
            throw new NoteNotFoundException(id);
        }
        noteRepository.deleteById(id);
    }
}