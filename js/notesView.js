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

  _createListItemHTML(id, title, body, updated) {}
}
