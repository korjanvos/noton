package org.kvos.notonserver.note;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteMapper {
    private final NoteRepository noteRepository;
    private final ModelMapper modelMapper;

    public NoteMapper(NoteRepository noteRepository, ModelMapper modelMapper) {
        this.noteRepository = noteRepository;
        this.modelMapper = modelMapper;
    }

    public List<NoteDto> convertToDto(List<Note> notes) {
        return notes.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public NoteDto convertToDto(Note note) {
        return modelMapper.map(note, NoteDto.class);
    }

    public Note convertToEntity(NoteDto NoteDto) {
        Note newNote = modelMapper.map(NoteDto, Note.class);

        Long id = NoteDto.getId();
        if (id != null) {
            Note note = noteRepository.findById(id)
                    .orElseThrow(() -> new NoteNotFoundException(id));

            newNote.setNotebook(note.getNotebook());
        }

        return newNote;
    }
}
