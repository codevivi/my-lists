const List = require("./List");
const ListToChooseElement = require("./elements/ListToChooseElement");
const myLocalStorage = require("./MyLocalStorage");
const listsElement = document.getElementById("lists");
const addListFormElement = document.getElementById("add-list-form");
const inputListElement = document.getElementById("input-list");

class Lists {
  constructor() {
    let allLists = myLocalStorage.getAllLists();
    let elementsToChooseMap = new Map();
    let selectedList;
    allLists.forEach((list) => {
      if (list.selected) {
        selectedList = new List(list);
      } else {
        elementsToChooseMap.set(list.id, new ListToChooseElement(list));
      }
    });
    this.allLists = allLists;
    this.elementsToChoose = elementsToChooseMap;
    this.selectedList = selectedList;
  }
  render() {
    if (this.selectedList) {
      this.selectedList.render();
    }
    console.log(this.elementsToChoose);
    this.elementsToChoose.forEach((element) => {
      Lists.listsEl.append(element);
    });
  }

  unselectCurrentList() {
    let listToUnSelect = myLocalStorage.getItem(this.selectedList.id);
    listToUnSelect.selected = false;
    myLocalStorage.setItem(listToUnSelect.id, listToUnSelect);
    this.allLists.set(listToUnSelect.id, listToUnSelect);
    let el = new ListToChooseElement(listToUnSelect);
    this.elementsToChoose.set(listToUnSelect.id, el);
    Lists.listsEl.append(el);
  }
  addList(name) {
    let alreadyExistingList = null;
    this.allLists.forEach((list) => {
      if (list.name === name) {
        alreadyExistingList = list;
      }
    });
    if (!alreadyExistingList) {
      let id = new Date().getTime();
      let list = { id: id, name: name, itemsUndone: [], itemsCompleted: [] };
      myLocalStorage.setItem(list.id, list);
      this.allLists.set(id, list);
      this.selectList(id);
      Lists.addListFormEl.reset();
      Lists.inputListEl.value = "";
    } else {
      this.selectList(alreadyExistingList.id);
    }
    Lists.addListFormEl.reset();
    Lists.inputListEl.value = "";
  }
  deleteList(id) {
    this.allLists.delete(id);
    this.selectedList.clearUi();
    myLocalStorage.removeItem(id);
    this.selectedList = null;

    //select any first list if any left
    let allListsIterator = this.allLists.entries();
    let allListsIteratorFirst = allListsIterator.next();
    if (allListsIteratorFirst.value) {
      let newListToChoose = allListsIteratorFirst.value[1];
      this.selectList(newListToChoose.id);
    }
  }
  selectList(id) {
    if (this.selectedList) {
      this.unselectCurrentList();
    }
    let updatedChosenList = myLocalStorage.getItem(id);
    updatedChosenList.selected = true;
    this.elementsToChoose.get(id)?.remove();
    this.elementsToChoose?.delete(id);
    myLocalStorage.setItem(id, updatedChosenList);
    this.selectedList = new List(updatedChosenList);
    this.selectedList.render();
  }
  static clearUi() {
    this.listsEl.innerHTML = "";
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
