"use strict";
////testing development only
const htmlValidator = require("./src/htmlValidator.js");
const Lists = require("./src/Lists.js");
const myLocalStorage = require("./src/MyLocalStorage");
const body = document.querySelector("body");
const itemInputElement = document.getElementById("input-item");
const inputListElement = document.getElementById("input-list");
const userActions = require("./src/userActions.js");
htmlValidator();

myLocalStorage.accept();
let lists = new Lists();
lists.render();

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
