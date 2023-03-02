import {
    makeObservable, action
    , observable, computed, runInAction, autorun
} from "mobx";

class ChartStore {
    data = [];
    days = [];
    constructor() {
        makeObservable(this, {
            getData: computed,
            getDays: computed,
            addNewData: action,
            addNewDay: action,
            data: observable,
            days: observable
        })
        autorun(this.printOutStoreInfo);
    }
    get getData() {
        return this.data;
    }

    get getDays() {
        return this.days;
    }

    addNewData(data) {
        this.data.push(data);
        if(this.data.length > 7) this.data.splice(0, 1);
    }

    addNewDay(day) {
        this.days.push(day);
        if(this.days.length > 7) this.days.splice(0, 1);
    }

    fetchData = () => {
        const newData = [23, 23, 23, 21, 12, 12, 0];
        const newDay = [
            ['Monday', '12-07-2022'],
            ['Tuesday', '13-07-2023'],
            ['Wednesday', '14-07-2023'],
            ['Thursday', '15-07-2023'],
            ['Friday', '16-07-2022'],
            ['Saturday', '17-07-2023'],
            ['Sunday', '18-07-2023'],
        ];


        setTimeout(() => {
            newData.map(data => this.addNewData(data));
            newDay.map(day => this.addNewDay(day));
        }, 3000);
    }

    printOutStoreInfo = () => {
        console.log("Store info: " + "data-" + this.data.length + " day-" + this.days.length)
    }
}


export default ChartStore;


