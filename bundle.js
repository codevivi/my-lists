(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
////testing development only
//const htmlValidator = require("./src/htmlValidator.js");
const List = require("./src/List.js");
const Lists = require("./src/Lists.js");
//const Ui = require("./src/Ui.js");
const myLocalStorage = require("./src/MyLocalStorage");
const body = document.querySelector("body");
const itemInputElement = document.getElementById("input-item");
const inputListElement = document.getElementById("input-list");
//htmlValidator();

myLocalStorage.accept();
let list;
let lists = new Lists();
lists.render();
let listFromStorage = myLocalStorage.getItem(myLocalStorage.getItem("selectedListId"));
if (listFromStorage) {
  list = new List(listFromStorage);
  list.render();
}

const userActions = {
  addList: function (e) {
    e.preventDefault();
    let value = inputListElement.value.trim();
    console.log(value);
    if (value.length > 0) {
      lists.addList(value);
      list = new List(myLocalStorage.getItem(lists.selectedListId));
      list.render();
    }
  },
  selectList: function (e) {
    let id = Number(e.target.dataset.id);
    lists.selectList(id);
    list = new List(myLocalStorage.getItem(id));
    list.render();
  },
  deleteList: function (e) {
    let id = Number(e.target.dataset.id);
    lists.deleteList(id);
    List.resetUi();
    //list.titleElement.remove();
    list = null;
  },
  addItem: function (e) {
    e.preventDefault();
    let value = itemInputElement.value.trim();
    if (value.length > 0) {
      list.addItem(value);
    }
  },
  deleteItem: function (e) {
    let id = Number(e.target.dataset.id);
    list.deleteItem(id);
  },
  toggleItemCompleted: function (e) {
    let id = Number(e.target.dataset.id);
    list.toggleItemCompleted(id);
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

//htmlValidator();

},{"./src/List.js":2,"./src/Lists.js":3,"./src/MyLocalStorage":4}],2:[function(require,module,exports){
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

},{"./MyLocalStorage.js":4,"./elements/ListItemElement":7,"./elements/ListTitleElement":8}],3:[function(require,module,exports){
const List = require("./List");

const ListToChooseElement = require("./elements/ListToChooseElement");
const myLocalStorage = require("./MyLocalStorage");
const listsElement = document.getElementById("lists");
const addListFormElement = document.getElementById("add-list-form");
const inputListElement = document.getElementById("input-list");

class Lists {
  constructor() {
    this.selectedListId = "";
    console.log(myLocalStorage.getAllLists());
    this.lists = myLocalStorage.getAllLists();
    this.elements = new Map();
  }
  createElements() {
    this.lists.forEach((list) => this.elements.set(list.id, new ListToChooseElement(list)));
  }

  render() {
    this.createElements();
    this.elements.forEach((element) => {
      Lists.listsEl.append(element);
    });
  }

  save() {
    myLocalStorage.setItem("selectedListId", this.selectedListId);
  }
  addList(name) {
    let alreadyExistingList = null;
    this.lists.forEach((list) => {
      if (list.name === name) {
        alreadyExistingList = list;
      }
    });
    if (!alreadyExistingList) {
      let id = new Date().getTime();
      let list = { id: id, name: name, itemsUndone: [], itemsCompleted: [] };
      this.lists.set(list.id, list);
      this.elements.set(list.id, new ListToChooseElement(list));
      Lists.listsEl.append(this.elements.get(id));
      Lists.addListFormEl.reset();
      Lists.inputListEl.value = "";
      myLocalStorage.setItem(list.id, list);
      this.selectList(id);
    } else {
      this.selectList(alreadyExistingList.id);
    }
    Lists.addListFormEl.reset();
    Lists.inputListEl.value = "";
  }
  deleteList(id) {
    console.log(id);
    this.lists.delete(id);
    this.elements.get(id).remove();
    this.elements.delete(id);
    myLocalStorage.removeItem(id);
    this.selectedListId = "";
    ///select another list
    this.save();
  }
  selectList(id) {
    if (this.selectedListId) {
      this.elements.get(this.selectedListId).classList.remove("hidden");
    }
    this.selectedListId = id;
    this.elements.get(this.selectedListId).classList.add("hidden");
    this.save();
  }
  static get listsEl() {
    return listsElement;
  }
  static get addListFormEl() {
    return addListFormElement;
  }
  static get inputListEl() {
    return inputListElement;
  }
}
module.exports = Lists;

},{"./List":2,"./MyLocalStorage":4,"./elements/ListToChooseElement":9}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
const { span, textNode, li, button } = require("./ElMaker.js");

const binSvg = document.getElementById("bin-svg");

class DeleteButton {
  constructor(thingToDeleteId, actionString) {
    const options = {
      children: [textNode("Delete"), DeleteButton.#createDeleteBtnIcon()],
      attributes: [
        { name: "class", value: "delete-btn" },
        { name: "type", value: "button" },
        { name: "data-action", value: actionString },
        { name: "data-id", value: thingToDeleteId },
        //{ name: "data-completed", value: item.completed ? "true" : "" },
      ],
    };
    return button(options);
  }

  static #createDeleteBtnIcon() {
    let icon = binSvg.cloneNode(true);
    icon.removeAttribute("id");
    const options = {
      children: [icon],
      attributes: [{ name: "class", value: "delete-btn-icon" }],
    };
    return span(options);
  }
}
module.exports = DeleteButton;

},{"./ElMaker.js":6}],6:[function(require,module,exports){
class El {
  constructor() {}
  static textNode(text) {
    return document.createTextNode(text);
  }
  static span(options) {
    let span = document.createElement("span");
    options.children.forEach((child) => {
      span.appendChild(child);
    });
    options.attributes.forEach((attr) => {
      span.setAttribute(attr.name, attr.value);
    });
    return span;
  }
  static h1(options) {
    let h1 = document.createElement("h1");
    options.children.forEach((child) => {
      h1.appendChild(child);
    });
    options.attributes.forEach((attr) => {
      h1.setAttribute(attr.name, attr.value);
    });
    return h1;
  }
  static li(options) {
    let li = document.createElement("li");
    options.children.forEach((child) => {
      li.appendChild(child);
    });
    options.attributes.forEach((attr) => {
      li.setAttribute(attr.name, attr.value);
    });
    return li;
  }
  static button(options) {
    let button = document.createElement("button");
    options.children.forEach((child) => {
      button.appendChild(child);
    });
    options.attributes.forEach((attr) => {
      button.setAttribute(attr.name, attr.value);
    });
    return button;
  }
}
module.exports = El;

},{}],7:[function(require,module,exports){
const El = require("./ElMaker.js");
const { span, textNode, li, button } = require("./ElMaker.js");
const DeleteButton = require("./DeleteButton.js");

class ListItemElement {
  constructor(item) {
    let deleteButton = new DeleteButton(item.id, "deleteItem");
    const options = {
      children: [ListItemElement.#createItemTextElement(item.value), deleteButton],
      attributes: [
        { name: "class", value: `item ${item.completed ? "completed" : ""}` },
        { name: "id", value: "id" + item.id },
        { name: "data-id", value: item.id },
        { name: "data-completed", value: item.completed ? "true" : "" },
        { name: "data-action", value: "toggleItemCompleted" },
      ],
    };
    let el = li(options);
    return el;
  }
  static #createItemTextElement(text) {
    const options = {
      children: [textNode(text)],
      attributes: [{ name: "class", value: "item-text" }],
    };
    return span(options);
  }
}

module.exports = ListItemElement;

},{"./DeleteButton.js":5,"./ElMaker.js":6}],8:[function(require,module,exports){
const { span, h1, textNode, li, button } = require("./ElMaker.js");
const DeleteButton = require("./DeleteButton.js");

class ListTitleElement {
  constructor(list) {
    const options = {
      children: [ListTitleElement.#listNameText(list), new DeleteButton(list.id, "deleteList")],
      attributes: [
        { name: "class", value: `list-name` },
        { name: "data-id", value: list.id },
      ],
    };
    let el = h1(options);
    return el;
  }
  static #listNameText(list) {
    const options = {
      children: [textNode(list.name)],
      attributes: [
        { name: "class", value: `list-name-text` },
        { name: "data-id", value: list.id },
      ],
    };
    let el = span(options);
    return el;
  }
}
module.exports = ListTitleElement;

},{"./DeleteButton.js":5,"./ElMaker.js":6}],9:[function(require,module,exports){
const { span, textNode, li, button } = require("./ElMaker.js");
const El = require("./ElMaker");

class ListToChooseElement {
  constructor(list) {
    const options = {
      children: [El.textNode(`${list.name} (${list.itemsUndone.length})`)],
      attributes: [
        { name: "class", value: `list-to-choose` },
        { name: "data-id", value: list.id },
        { name: "data-action", value: "selectList" },
      ],
    };
    let el = li(options);
    return el;
  }
}
module.exports = ListToChooseElement;

},{"./ElMaker":6,"./ElMaker.js":6}]},{},[1]);
