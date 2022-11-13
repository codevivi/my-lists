const Ui = require("./Ui.js");
const listNameElement = document.getElementById("list-name");
const listElement = document.getElementById("list-items");
const listSizeElement = document.getElementById("size");
const listCompletedElement = document.getElementById("list-items-completed");
const listSizeCompletedElement = document.getElementById("size-completed");

class UiController {
  constructor(list) {
    this.list = list;
    list.itemsUndone.forEach((item) => {
      UiController.listEl.appendChild(Ui.createItemElement(item));
    });
    list.itemsCompleted.forEach((item) => {
      UiController.listCompletedEl.appendChild(Ui.createItemElement(item, "completed"));
    });
    UiController.nameEl.addEventListener("input", (e) => this.onNameEdit(e));
    UiController.listEl.addEventListener("click", (e) => this.onUndoneListClick(e));
  }

  plantItemElement(item) {
    let el = Ui.createItemElement(item);
    UiController.listEl.appendChild(el);
  }
  plantCompletedElement(item) {
    let el = Ui.createItemElement(item, "completed");
    UiController.listEl.appendChild(el);
  }
  onNameEdit(e) {
    console.log("editing name element", e.data);
  }
  onUndoneListClick(e) {
    console.log(e, `clicked on ${e.target}`);
    if (e.target.dataSet?.id) {
    }
  }

  static get nameEl() {
    return listNameElement;
  }
  static get listEl() {
    return listElement;
  }
  static get sizeEl() {
    return listSizeElement;
  }
  static get listCompletedEl() {
    return listCompletedElement;
  }
  static get sizeCompletedEl() {
    return listSizeCompletedElement;
  }
}
module.exports = UiController;
