"use strict";
////testing development only
const htmlValidator = require("./src/htmlValidator.js");
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

htmlValidator();
let listExample = {
  name: "Shopping",
  sizeCompleted: 4,
  sizeUndone: 4,
  items: [
    { id: 0, value: "Duona" },
    { id: 1, value: "Duona" },
    { id: 2, value: "Sviestas" },
    { id: 3, value: "Makaronai" },
    { id: 4, value: "Tulikinis", completed: true },
    { id: 5, value: "katems", completed: true },
    { id: 6, value: "bulbes", completed: true },
    { id: 7, value: "bulbes", completed: true },
  ],
};
let list = listExample;
const actions = {
  deleteItem: function (e) {
    let completed = e.target.dataset.completed;
    let id = Number(e.target.dataset.id);
    list.items = list.items.filter((item) => {
      if (item.id !== id) {
        return item;
      } else {
        if (item.completed) {
          list.sizeCompleted--;
          sizeCompletedElement.innerText = `(${list.sizeCompleted})`;
        } else {
          list.sizeUndone--;
          sizeUndoneElement.innerText = `(${list.sizeUndone})`;
        }
      }
    });
    e.target.parentElement.remove();
  },

  toggleItemCompleted: function (e) {
    console.log(e.target.dataset);
  },
};
body.addEventListener("click", (e) => {
  if (e.target.dataset.action) {
    try {
      actions[e.target.dataset.action](e);
    } catch (e) {
      console.log(e);
    }
  }
});

list.items.forEach((item) => appendItem(item));
listNameElement.textContent = list.name;
sizeUndoneElement.textContent = `(${list.sizeUndone})`;
sizeCompletedElement.textContent = `(${list.sizeCompleted})`;

function appendItem(item) {
  let element = new ListItemElement(item);
  let parentElement = !item.completed ? listUndoneElement : listCompletedElement;
  parentElement.appendChild(element);
}

//let list = new List(listExample);
//let uiController = new UiController(list);

htmlValidator();
