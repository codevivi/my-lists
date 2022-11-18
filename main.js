"use strict";
////testing development only
const htmlValidator = require("./src/htmlValidator.js");
const { LIST_EXAMPLE, DEFAULT_LIST } = require("./defaultList.js");
const Ui = require("./src/Ui.js");
///testing development only
//const Ui = require("./src/Ui.js");
const ListItemElement = require("./src/ListItemElement.js");

const myLocalStorage = require("./src/MyLocalStorage");
//const UiController = require("./src/UiController.js");
const body = document.querySelector("body");
const listNameElement = document.getElementById("list-name");
const listUndoneElement = document.getElementById("list-undone");
const sizeUndoneElement = document.getElementById("size-undone");
const listCompletedElement = document.getElementById("list-completed");
const sizeCompletedElement = document.getElementById("size-completed");
const itemInputElement = document.getElementById("input-item");
const itemInputFormElement = document.getElementById("add-item-form");
htmlValidator();
class List {
  constructor(listFromStorage) {
    this.name = listFromStorage.name;
    this.itemsCompleted = new Map(listFromStorage.itemsCompleted);
    this.itemsUndone = new Map(listFromStorage.itemsUndone);
  }
  prepListForStorage() {
    let listForStorage = {
      name: this.name,
      itemsCompleted: [...this.itemsCompleted],
      itemsUndone: [...this.itemsUndone],
    };
    return listForStorage;
  }
  save() {
    myLocalStorage.setItem(this.name, this.prepListForStorage());
  }
  addItem(value) {
    let id = new Date().getTime();
    let item = { id: id, value: value, completed: false };
    this.itemsUndone.set(id, item);
    this.save();
    console.log(this.itemsUndone);
    return item;
  }

  deleteItem(id) {
    this.itemsUndone.delete(id);
    this.itemsCompleted.delete(id);
    console.log(this.itemsUndone);
    this.save();
  }
  toggleItemCompleted(id) {
    let item = this.itemsUndone.get(id);
    if (item) {
      console.log(item);
      this.itemsUndone.delete(id);
      item.completed = !item.completed;
      item.id = new Date().getTime();
      this.itemsCompleted.set(item.id, item);
    } else {
      console.log(item);
      item = this.itemsCompleted.get(id);
      this.itemsCompleted.delete(id);
      item.completed = !item.completed;
      item.id = new Date().getTime();
      this.itemsUndone.set(item.id, item);
    }
    this.save();
    return item;
  }
}
myLocalStorage.accept();
let list = new List(LIST_EXAMPLE);
let ui = new Ui(list);
myLocalStorage.setItem(list.name, list.prepListForStorage());
//populateListElements(list);

const userActions = {
  addItem: function (e) {
    e.preventDefault();
    let value = itemInputElement.value.trim();
    if (value.length > 0) {
      ui.addItemElement(list.addItem(value));
    }
    itemInputFormElement.reset();
    itemInputElement.value = "";
    ui.updateSizeElements();
  },
  deleteItem: function (e) {
    let id = Number(e.target.dataset.id);
    list.deleteItem(id);
    e.target.parentElement.remove();
    ui.updateSizeElements();
  },
  toggleItemCompleted: function (e) {
    let id = Number(e.target.dataset.id);
    let item = list.toggleItemCompleted(id);
    ui.addItemElement(item);
    e.target.remove();
    ui.updateSizeElements();
  },
};

body.addEventListener("click", (e) => {
  let action = e.target.dataset.action;
  if (action) {
    try {
      userActions[action](e);
    } catch (e) {
      console.log(e);
    }
  }
});
// function addItemElement(item) {
//   if (item.completed) {
//     listCompletedElement.prepend(new ListItemElement(item));
//   } else {
//     listUndoneElement.append(new ListItemElement(item));
//   }
// }
// function updateSizeElements() {
//   sizeUndoneElement.textContent = `(${list.itemsUndone.size})`;
//   sizeCompletedElement.textContent = `(${list.itemsCompleted.size})`;
// }
// function populateListElements(list) {
//   list.itemsUndone.forEach((item, key) => listUndoneElement.append(new ListItemElement(item)));
//   list.itemsCompleted.forEach((item, key) => listCompletedElement.prepend(new ListItemElement(item)));
//   listNameElement.textContent = list.name;
//   sizeUndoneElement.textContent = `(${list.itemsUndone.size})`;
//   sizeCompletedElement.textContent = `(${list.itemsCompleted.size})`;
// }
// function resetListElements() {
//   listUndoneElement.innerHTML = "";
//   listCompletedElement.innerHTML = "";
//   sizeUndoneElement.textContent = `(0)`;
//   sizeCompletedElement.textContent = `(0)`;
// }

//let list = new List(listExample);
//let uiController = new UiController(list);

htmlValidator();
