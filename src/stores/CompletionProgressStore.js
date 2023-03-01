import {
    makeObservable, action
    , observable, computed, runInAction, autorun
} from "mobx";

class CompletionProgressStore {
    books = [];

    constructor() {
        makeObservable(this,{
            books: observable,
            bookLists: computed,
            addBook: action,
            removeBook: action
        })

        runInAction(this.fetchData);
    }

    get bookLists() {
        return [...books];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        this.books = this.books.filter(book => book.title !== book.title && book.progress !== book.progress);
    }

    fetchData() {

    }
}

export default CompletionProgressStore;