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
