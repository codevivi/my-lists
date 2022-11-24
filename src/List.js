const ListItemElement = require("./elements/ListItemElement");
const ListTitleElement = require("./elements/ListTitleElement");
const ListTitleContainerElement = document.getElementById("list-title-container");
const listUndoneElement = document.getElementById("list-undone");
const sizeUndoneElement = document.getElementById("size-undone");
const listCompletedElement = document.getElementById("list-completed");
const sizeCompletedElement = document.getElementById("size-completed");
const itemInputElement = document.getElementById("input-item");
const itemInputFormElement = document.getElementById("add-item-form");
const deleteListButtonElement = document.getElementById("delete-list-btn");

const myLocalStorage = require("./MyLocalStorage.js");

class List {
  constructor(listFromStorage) {
    this.name = listFromStorage.name;
    this.id = listFromStorage.id;
    this.itemsCompleted = new Map(listFromStorage.itemsCompleted);
    this.itemsUndone = new Map(listFromStorage.itemsUndone);
    this.itemElements = new Map();
    this.titleElement = null;
    List.itemInputFormEl.classList.remove("hidden");
    List.itemInputEl.focus();
  }
  createElements() {
    this.titleElement = new ListTitleElement(this);
    this.itemsUndone.forEach((item) => this.itemElements.set(item.id, new ListItemElement(item)));
    this.itemsCompleted.forEach((item) => this.itemElements.set(item.id, new ListItemElement(item)));
  }

  render() {
    List.resetUi();
    //List.deleteListButtonEl.dataset.id = this.id;
    this.createElements();
    List.listTitleContainerEl.append(this.titleElement);
    this.itemElements.forEach((element) => {
      if (!element.dataset.completed) {
        List.listUndoneEl.append(element);
      } else {
        List.listCompletedEl.prepend(element);
      }
    });
    this.updateSizeElements();
  }
  updateSizeElements() {
    List.sizeCompletedEl.textContent = `(${this.itemsCompleted.size})`;
    List.sizeUndoneEl.textContent = `(${this.itemsUndone.size})`;
  }

  prepListForStorage() {
    let listForStorage = {
      id: this.id,
      name: this.name,
      itemsCompleted: [...this.itemsCompleted],
      itemsUndone: [...this.itemsUndone],
    };
    return listForStorage;
  }
  save() {
    myLocalStorage.setItem(this.id, this.prepListForStorage());
  }
  addItem(value) {
    let alreadyExists = false;
    this.itemsUndone.forEach((item) => {
      if (item.value === value) {
        alreadyExists = true;
      }
    });
    if (!alreadyExists) {
      let itemIsCompleted = null;
      this.itemsCompleted.forEach((item) => {
        if (item.value === value) {
          itemIsCompleted = item;
        }
      });
      if (itemIsCompleted) {
        this.itemElements.get(itemIsCompleted.id).remove();
        this.itemsCompleted.delete(itemIsCompleted.id);
      }
      let id = new Date().getTime();
      let item = { id: id, value: value, completed: false };
      this.itemsUndone.set(id, item);
      this.itemElements.set(id, new ListItemElement(item));
      List.listUndoneEl.append(this.itemElements.get(id));
      this.updateSizeElements();
      this.save();
    }
    List.itemInputFormEl.reset();
    List.itemInputEl.value = "";
  }
  deleteItem(id) {
    this.itemsUndone.delete(id);
    this.itemsCompleted.delete(id);
    this.itemElements.get(id).remove();
    this.itemElements.delete(id);
    this.updateSizeElements();
    this.save();
  }
  toggleItemCompleted(id) {
    let item = this.itemsUndone.get(id) || this.itemsCompleted.get(id);
    item.completed = !item.completed;
    item.id = new Date().getTime();
    this.itemElements.set(item.id, new ListItemElement(item));
    if (!item.completed) {
      this.itemsUndone.set(item.id, item);
      List.listUndoneEl.append(this.itemElements.get(item.id));
    } else {
      this.itemsCompleted.set(item.id, item);
      List.listCompletedEl.prepend(this.itemElements.get(item.id));
    }
    this.deleteItem(id);
  }
  static resetUi() {
    List.listTitleContainerEl.innerHTML = "";
    List.listUndoneEl.innerHTML = "";
    List.listCompletedEl.innerHTML = "";
    List.sizeCompletedEl.textContent = ``;
    List.sizeUndoneEl.textContent = ``;
  }
  static get listTitleContainerEl() {
    return ListTitleContainerElement;
  }
  static get deleteListButtonEl() {
    return deleteListButtonElement;
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
  static get itemInputFormEl() {
    return itemInputFormElement;
  }
}
module.exports = List;
