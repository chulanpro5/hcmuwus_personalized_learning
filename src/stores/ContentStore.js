import {
    makeObservable, action
    , observable, computed, runInAction, autorun
} from "mobx";

class ContentStore {
    content = [];

    constructor() {
        
    }

    get getContent() {
        return [...content];
    }

    updateContent(content) {
        newContent = []
        content.map(item => newContent.push(item))
        content = newContent;
    }

    removeContent(content) {
    }

    fetchData() {

    }
}
export default ContentStore;