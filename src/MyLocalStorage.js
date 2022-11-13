"use strict";
class MyLocalStorage {
  //lowest level (db)
  constructor() {
    if (!storageAvailable("localStorage")) {
      return { isAccepted: false, error: "localStorage is not available in this browser " };
    }
    this.isAccepted = localStorage.getItem("isAccepted") ? true : false;
  }
  accept() {
    this.isAccepted = true;
    this.setItem("isAccepted", true);
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
