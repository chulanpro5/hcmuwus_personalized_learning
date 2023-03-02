import {
    makeObservable, action
    , observable, computed, runInAction, autorun, makeAutoObservable
} from "mobx";
import { v4 as uuidv4 } from 'uuid';


class NotesStore {
    notes = [];

    constructor() {
        this.notes = [];
    }

    getNotes() {
        return this.notes;
    }

    addNote(note) {
        this.notes.push(note);
    }

    removeNote(deletedNote) {
        this.notes.filter(note => note.id != deletedNote.id)
    }

    fetchData() {

    }
}

const store = new NotesStore();
export default store;