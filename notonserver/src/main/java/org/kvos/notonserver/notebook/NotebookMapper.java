package org.kvos.notonserver.notebook;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotebookMapper {
    private final NotebookRepository notebookRepository;
    private final ModelMapper modelMapper;

    public NotebookMapper(NotebookRepository notebookRepository, ModelMapper modelMapper) {
        this.notebookRepository = notebookRepository;
        this.modelMapper = modelMapper;
    }

    public List<NotebookDto> convertToDto(List<Notebook> notebooks) {
        return notebooks.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public NotebookDto convertToDto(Notebook notebook) {
        return modelMapper.map(notebook, NotebookDto.class);
    }

    public Notebook convertToEntity(NotebookDto notebookDto) {
        Notebook newNotebook = modelMapper.map(notebookDto, Notebook.class);

        Long id = notebookDto.getId();
        if (id != null) {
            Notebook notebook = notebookRepository.findById(id)
                    .orElseThrow(() -> new NotebookNotFoundException(id));

            newNotebook.setNotes(notebook.getNotes());
        }

        return newNotebook;
    }
}
