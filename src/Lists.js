const List = require("./List");
const ListToChooseElement = require("./ListToChooseElement");
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
    console.log(this.selectedListId);
    let id = new Date().getTime();
    let list = { id: id, name: name, itemsUndone: [], itemsCompleted: [] };
    this.lists.set(list.id, list);
    this.elements.set(list.id, new ListToChooseElement(list));
    Lists.listsEl.append(this.elements.get(id));
    Lists.addListFormEl.reset();
    Lists.inputListEl.value = "";
    myLocalStorage.setItem(list.id, list);
    this.selectList(id);
  }
  deleteList(id) {
    this.lists.delete(id);
    this.elements.get(id).remove();
    this.elements.delete(id);
    myLocalStorage.remove(id);
    this.selectedListId = "";
    ///select another list
    this.save();
  }
  selectList(id) {
    this.selectedListId = id;
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
