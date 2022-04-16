export default class notesView {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `
         <div class="notes__sidebar center">
        <button class="notes__add" type="button">Add Note</button>
        <div class="notes__list">
          
         </div>
      </div>
      <div class="notes__preview">
        <input type="text" placeholder="Enter a title" class="notes__title" />
        <textarea class="notes__body">I am the notes body</textarea>
      </div>                            
    `;

    const btnAddNote = this.root.querySelector(".notes__add");
    const inpTitle = this.root.querySelector(".notes__title");
    const inpBody = this.root.querySelector(".notes__body");

    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inpTitle, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();
        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    //TODO: add the note preview by default
  }

  _createListItemHTML(id, title, body, updated) {
    const _MAX_BODY_LENGHT = 60;

    return `
      <div class="notes__list-item" data-note-id="${id}">
            <div class="notes__small-title">${title}</div>
            <div class="notes__small-body">${body.substring(
              0,
              _MAX_BODY_LENGHT
            )}
            ${body.length > 60 ? "..." : ""}
            </div>
            <div class="notes__small-updtated">${updated.toLocaleString(
              undefined,
              { dateStyle: "full", timeStyle: "short" }
            )}</div>

      </div>
    `;
  }

  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notes__list");
    //clear the list
    notesListContainer.innerHTML = "";

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );
      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    //add select/delet event for each note item
    notesListContainer
      .querySelectorAll(".notes__list-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm("Are you shure you want to delete?");
          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  updateActiveNote(note) {
    this.root.querySelector();
  }
}
