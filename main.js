"use strict";
////testing development only
const htmlValidator = require("./src/htmlValidator.js");
const Lists = require("./src/Lists.js");
const body = document.querySelector("body");
const myLocalStorage = require("./src/MyLocalStorage.js");
const inputListElement = document.getElementById("input-list");
const itemInputElement = document.getElementById("input-item");
htmlValidator();

let lists = new Lists();
lists.render();
const userActions = {
  acceptLocalStorage: function (e) {
    myLocalStorage.accept();
  },
  addList: function (e) {
    e.preventDefault();
    let value = inputListElement.value.trim();
    if (value.length > 0) {
      lists.addList(value);
    }
  },
  selectList: function (e) {
    let id = Number(e.target.dataset.id);
    lists.selectList(id);
  },
  deleteList: function (e) {
    let id = Number(e.target.dataset.id);
    lists.deleteList(id);
  },
  addItem: function (e) {
    e.preventDefault();
    let value = itemInputElement.value.trim();
    if (value.length > 0) {
      lists.selectedList.addItem(value);
    }
  },
  deleteItem: function (e) {
    let id = Number(e.target.dataset.id);
    lists.selectedList.deleteItem(id);
  },
  toggleItemCompleted: function (e) {
    let id = Number(e.target.dataset.id);
    lists.selectedList.toggleItemCompleted(id);
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

htmlValidator();
