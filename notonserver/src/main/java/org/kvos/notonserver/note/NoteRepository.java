package org.kvos.notonserver.note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface NoteRepository extends JpaRepository<Note, Long> {
}
