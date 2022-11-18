"use strict";
////testing development only
const htmlValidator = require("./src/htmlValidator.js");
///testing development only
//const Ui = require("./src/Ui.js");
const ListItemElement = require("./src/ListItemElement.js");

const myLocalStorage = require("./src/MyLocalStorage");
myLocalStorage.accept();
//const UiController = require("./src/UiController.js");
const body = document.querySelector("body");
const listNameElement = document.getElementById("list-name");
const listUndoneElement = document.getElementById("list-undone");
const sizeUndoneElement = document.getElementById("size-undone");
const listCompletedElement = document.getElementById("list-completed");
const sizeCompletedElement = document.getElementById("size-completed");
try {
  htmlValidator();
  let listExample = {
    name: "Shopping",
    sizeCompleted: 4,
    sizeUndone: 4,
    itemsUndone: [
      { id: 0, value: "Duona", comleted: false },
      { id: 1, value: "Duona", completed: false },
      { id: 2, value: "Sviestas", completed: false },
      { id: 3, value: "Makaronai", completed: false },
    ],
    itemsCompleted: [
      { id: 4, value: "Tulikinis", completed: true },
      { id: 5, value: "katems", completed: true },
      { id: 6, value: "bulbes", completed: true },
      { id: 7, value: "bulbes", completed: true },
    ],
  };
  let list = listExample;
  const MyItem = class {
    constructor(item, parent) {
      this.rawItem = item;
      this.element = new ListItemElement(item);
      this.parent = parent;
      this.parent.element.appendChild(this.element);
    }
  };
  const MyName = class {
    constructor(name) {
      this.value = name;
      this.element = listNameElement;
      this.element.textContent = this.value;
    }
    update(name) {
      this.value = name;
      this.element.textContent = this.value;
    }
  };

  class SubList {
    constructor(subListItems, element, sizeElement) {
      this.completed = false;
      //this.element = element;
      //this.sizeElement = sizeElement;
      this.items = subListItems.map((item) => new MyItem(item));
      this.updateSize();
      //this.sizeElement.textContent = `(${this.items.length})`;
    }
    addItem(item) {
      this.elements.push(item);
      this.updateSize();
    }
    get size() {
      return this.items.length;
    }
    updateSize() {
      this.sizeElement.textContent = `(${this.size})`;
    }
  }
  class SubListUndone extends SubList {
    constructor(subListItems) {
      super(subListItems);
      this.element = listUndoneElement;
      this.sizeElement = sizeUndoneElement;
    }
  }
  class SubListCompleted extends SubList {
    constructor(subListItems) {
      super(subListItems);
      this.completed = true;
      this.element = listUndoneElement;
      this.sizeElement = sizeUndoneElement;
    }
  }
  let MyList = class {
    constructor(listFromStorage) {
      this.name = new MyName(listFromStorage.name);
      this.itemsCompleted = new SubListCompleted(listFromStorage.itemsCompleted);
      this.itemsUndone = new SubListUndone(listFromStorage.itemsUndone);
    }
    //addItem(value) {}
    deleteItem(e) {
      let id = Number(e.target.dataset.id);
      let subListToDeleteFrom = e.target.dataset.completed ? "itemsCompleted" : "itemsUndone";
      let deletedRawItem = null;
      this[subListToDeleteFrom].items = this[subListToDeleteFrom].items.filter((item) => {
        if (item.rawItem.id === id) {
          deletedRawItem = item.rawItem;
          item.element.remove();
        } else {
          return item;
        }
      });
      this[subListToDeleteFrom].updateSize();
      this.saveList();
      return deletedRawItem;
    }
    chooseSubLisForItem(item) {
      if (item.completed) {
        return this.itemsCompleted;
      }
      return this.itemsUndone;
    }
    toggleCompleted(e) {
      let item = this.deleteItem(e);
      console.log(item);
      item.completed = !item.completed;
      let itemSubList = this.chooseSubLisForItem(item);
      itemSubList.addItem(new MyItem(item));
    }
    saveList() {
      myLocalStorage.setItem(this.name.value, this.prepForStorage());
    }
    prepForStorage() {
      let preppedList = { name: this.name.value, itemsCompleted: this.prepSubListForStorage(this.itemsCompleted), itemsUndone: this.prepSubListForStorage(this.itemsUndone) };
      return preppedList;
    }
    prepSubListForStorage(subList) {
      let prepped = subList.items.map((item) => {
        let changedItem = { id: item.rawItem.id, value: item.rawItem.value, completed: item.rawItem.completed };
        return changedItem;
      });
      return prepped;
    }
  };
  const myList = new MyList(listExample);

  body.addEventListener("click", (e) => {
    let action = e.target.dataset.action;
    if (action) {
      try {
        myList[action](e);
      } catch (e) {
        console.log(e);
      }
    }
  });

  // list.items.forEach((item) => appendItem(item));
  // listNameElement.textContent = list.name;
  // sizeUndoneElement.textContent = `(${list.sizeUndone})`;
  // sizeCompletedElement.textContent = `(${list.sizeCompleted})`;

  // function appendItem(item) {
  //   let element = new ListItemElement(item);
  //   let parentElement = !item.completed ? listUndoneElement : listCompletedElement;
  //   parentElement.appendChild(element);
  // }

  //let list = new List(listExample);
  //let uiController = new UiController(list);

  htmlValidator();
} catch (e) {
  console.log(e, "bla");
}
