const ListItemElement = require("./ListItemElement");
const listNameElement = document.getElementById("list-name");
const listUndoneElement = document.getElementById("list-undone");
const sizeUndoneElement = document.getElementById("size-undone");
const listCompletedElement = document.getElementById("list-completed");
const sizeCompletedElement = document.getElementById("size-completed");
const itemInputElement = document.getElementById("input-item");
const itemInputFormElement = document.getElementById("add-item-form");

class Ui {
  constructor(list) {
    this.list = list;
    Ui.resetListElements();
    let itemsUndoneElements = new Map();
    list.itemsUndone.forEach((item) => itemsUndoneElements.set(item.id, new ListItemElement(item)));
    console.log(itemsUndoneElements);
    itemsUndoneElements.forEach((element) => listUndoneElement.append(element));
    this.itemsUndoneElements = itemsUndoneElements;
    //this.list.itemsUndone.forEach((item, key) => listUndoneElement.append(new ListItemElement(item)));
    //this.list.itemsCompleted.forEach((item, key) => listCompletedElement.prepend(new ListItemElement(item)));
    listNameElement.textContent = this.list.name;
    sizeUndoneElement.textContent = `(${this.list.itemsUndone.size})`;
    sizeCompletedElement.textContent = `(${this.list.itemsCompleted.size})`;
  }
  addItemElement(item) {
    if (item.completed) {
      listCompletedElement.prepend(new ListItemElement(item));
    } else {
      this.itemsUndoneElements.set(new ListItemElement(item));
      listUndoneElement.append(this.itemsUndoneElements.get(item.id));
    }
  }
  deleteItemElement(item) {
    if (item.completed) {
      listCompletedElement.getElementById(`id${item.id}`);
    }
  }
  updateSizeElements() {
    sizeUndoneElement.textContent = `(${this.list.itemsUndone.size})`;
    sizeCompletedElement.textContent = `(${this.list.itemsCompleted.size})`;
  }

  static resetListElements() {
    listUndoneElement.innerHTML = "";
    listCompletedElement.innerHTML = "";
    sizeUndoneElement.textContent = `(0)`;
    sizeCompletedElement.textContent = `(0)`;
  }

  static get nameEl() {
    return listNameElement;
  }
  static get listUndoneEl() {
    return listUndoneElement;
  }
  static get sizeUndoneEl() {
    return sizeUndoneElement;
  }
  static get listCompletedEl() {
    return listCompletedElement;
  }
  static get sizeCompletedEl() {
    return sizeCompletedElement;
  }
  static get itemInputEl() {
    return itemInputElement;
  }
}
module.exports = Ui;
