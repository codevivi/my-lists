"use strict";
const styles = require("./styles/main.scss");
////testing development only
window.onload = function () {
  const Lists = require("./Lists.js");
  const body = document.querySelector("body");
  const myLocalStorage = require("./MyLocalStorage.js");
  const inputListElement = document.getElementById("input-list");
  const itemInputElement = document.getElementById("input-item");
  const modalMoreElement = document.getElementById("modal-more");
  const importForm = document.getElementById("import-form");
  const moreButton = document.getElementById("more-btn");
  const moreIcon = document.getElementById("more-icon");
  const closeIcon = document.getElementById("close-icon");

  const fileInput = document.getElementById("file-input");
  const { saveToFile, getFromFile } = require("./fileStorage.js");
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
    openMoreModal: function (e) {
      modalMoreElement.classList.remove("hidden");
      moreButton.setAttribute("data-action", "exitMoreModal");
      moreIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    },
    exitMoreModal: function (e) {
      modalMoreElement.classList.add("hidden");
      moreButton.setAttribute("data-action", "openMoreModal");
      moreIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    },
    saveToFile: function (e) {
      saveToFile("my_lists", myLocalStorage.getAll());
      this.exitMoreModal();
    },
    restoreFromFile: async function (e) {
      e.preventDefault();
      let file = fileInput.files[0];
      if (file) {
        let data = await getFromFile(file);
        myLocalStorage.clear();
        for (let prop in data) {
          myLocalStorage.setItem(prop, data[prop]);
        }
        importForm.reset();
        this.exitMoreModal();
        Lists.clearUi();
        lists = new Lists();
        lists.render();
      }
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
  body.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      console.log(e.type);
      let action = document.activeElement.dataset.action;
      if (action) {
        e.preventDefault();
        try {
          userActions[action](e);
        } catch (e) {
          console.log(e);
        }
      }
    }
  });
};
