package org.kvos.notonserver.note;

class NoteNotFoundException extends RuntimeException {
    NoteNotFoundException(Long id) {
        super("Could not find note " + id);
    }
}
