package org.kvos.notonserver.Note;

class NoteNotFoundException extends RuntimeException {
    NoteNotFoundException(Long id) {
        super("Could not find note " + id);
    }
}
