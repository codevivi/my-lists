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
