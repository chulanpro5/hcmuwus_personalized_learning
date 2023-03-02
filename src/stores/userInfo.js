import {
    action,
    computed,
    makeObservable,
    observable,
    autorun,
    runInAction,
  } from "mobx";
  
  class UserInfoStore {
    data = [];
  
    constructor() {
      makeObservable(this, {
        data: observable,
        totalData: computed,
        storeDetails: computed,
        createUser: action,
        updateUser: action,
        deleteUser: action,
        findUser: action,
      });
      autorun(this.logStoreDetails);
      runInAction(this.prefetchData);
    }
  
    // total number of data
    get totalData() {
      return this.data.length;
    }
  
    createUser(user = { id: "0", name: ""}) {
        console.log("in create user");
      this.data.push(user);
      this.logStoreDetails();
      return user;
    }
  
    updateUser(userID, update) {
      const userIndexAtId = this.data.findIndex(
        (user) => user.id === userID
      );
      if (userIndexAtId > -1 && update) {
        this.data[userIndexAtId] = update;
        return this.data[userIndexAtId];
      }
    }
  
    deleteUser(userId) {
      const userIndexAtId = this.data.findIndex((user) => user.id === userId);
      if (userIndexAtId > -1) {
        this.data.splice(userIndexAtId, 1);
      }
    }

    findUser(userId) {
        const userIndexAtId = this.data.findIndex((user) => user.id === userId);
        if (userIndexAtId > -1) {
            return this.data[userIndexAtId];
        }
    }
  
    get storeDetails() {
      return `We have ${this.totalData} users, so far!!!`;
    }
  
    logStoreDetails = () => {
      console.log(this.storeDetails);
      this.data.forEach((user) => console.log(user));
    };
  
    prefetchData = () => {
        if (this.totalData > 0) {
            return;
        }
      const data = [
        {
          id: 1,
          name: "Lincy",
        },
      ];
  
      setTimeout(() => {
        console.log("Fetch complete update store");
        data.map((user) => this.createUser(user));
      }, 3000);
    };
  }
  const userInfo = new UserInfoStore();
  export default userInfo;
  