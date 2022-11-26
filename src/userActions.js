const userActions = {
  addList: function (e) {
    e.preventDefault();
    let value = inputListElement.value.trim();
    console.log(value);
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
module.exports = userActions;
