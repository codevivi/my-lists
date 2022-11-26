"use strict";

const acceptLocalStorageModal = document.getElementById("accept-localstorage-modal");
class MyLocalStorage {
  //lowest level (db)
  constructor() {
    if (!storageAvailable("localStorage")) {
      return { isAccepted: false, error: "localStorage is not available in this browser " };
    }
    let isAccepted = localStorage.getItem("isAccepted") ? true : false;
    if (!isAccepted) {
      acceptLocalStorageModal.classList.remove("hidden");
    }
    this.isAccepted = isAccepted;
  }
  accept() {
    this.isAccepted = true;
    this.setItem("isAccepted", true);
    acceptLocalStorageModal.classList.add("hidden");
  }
  refuse() {
    this.isAccepted = false;
    this.clear();
  }
  reset() {
    this.clear();
    this.setItem("isAccepted", this.isAccepted);
  }
  clear() {
    localStorage.clear();
  }
  getItem(name) {
    let item = localStorage.getItem(name);
    if (!item) return false;
    if (item.startsWith("{")) {
      item = JSON.parse(item);
    }
    return item;
  }
  getAll() {
    let obj = {};
    Object.keys(localStorage).map((key) => (obj[key] = this.getItem(key)));
    return obj;
  }
  getAllLists() {
    let all = [];
    Object.keys(localStorage).forEach((key) => {
      if (key !== "selectedListId" && key !== "isAccepted") {
        all.push(this.getItem(key));
      }
    });
    return new Map(all.map((list) => [list.id, list]));
  }
  setItem(name, value) {
    if (this.isAccepted) {
      if (typeof value === "object") {
        localStorage.setItem(name, JSON.stringify(value));
      } else {
        localStorage.setItem(name, value);
      }
    }
  }
  removeItem(name) {
    localStorage.removeItem(name);
  }
}
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
module.exports = new MyLocalStorage();
