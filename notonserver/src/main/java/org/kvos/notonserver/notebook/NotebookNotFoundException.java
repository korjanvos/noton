package org.kvos.notonserver.notebook;

class NotebookNotFoundException extends RuntimeException {
    NotebookNotFoundException(Long id) {
        super("could not find notebook with id " + id);
    }
}
