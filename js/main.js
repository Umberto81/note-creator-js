import notesAPI from "./notesAPI.js";
import notesView from "./notesView.js";

const app = document.getElementById("app");

const view = new notesView(app, {
  onNoteAdd() {
    console.log("note has been added..");
  },

  onNoteEdit(newTitle, newBody) {
    console.log(newTitle);
    console.log(newBody);
  },
});

console.log(notesAPI.getAllNotes());
