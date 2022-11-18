// const El = require("./ElMaker.js");
const { span, textNode, li, button } = require("./ElMaker.js");

const binSvg = document.getElementById("bin-svg");
console.log(binSvg);

class ListItemElement {
  constructor(item) {
    let deleteButton = ListItemElement.#createDeleteButton(item);
    const options = {
      children: [ListItemElement.#createItemTextElement(item.value), deleteButton],
      attributes: [
        { name: "class", value: `item ${item.completed ? "completed" : ""}` },
        { name: "id", value: "id" + item.id },
        { name: "data-id", value: item.id },
        { name: "data-completed", value: item.completed ? "true" : "" },
        { name: "data-action", value: "toggleItemCompleted" },
      ],
    };
    let el = li(options);
    return el;
  }
  static #createItemTextElement(text) {
    const options = {
      children: [textNode(text)],
      attributes: [{ name: "class", value: "item-text" }],
    };
    return span(options);
  }

  static #createDeleteButton(item, parent) {
    const options = {
      children: [textNode("Delete item"), ListItemElement.#createDeleteBtnIcon()],
      attributes: [
        { name: "class", value: "delete-btn" },
        { name: "type", value: "button" },
        { name: "data-action", value: "deleteItem" },
        { name: "data-id", value: item.id },
        { name: "data-completed", value: item.completed ? "true" : "" },
      ],
    };
    return button(options);
  }
  static #createDeleteBtnIcon() {
    let icon = binSvg.cloneNode(true);
    icon.removeAttribute("id");
    const options = {
      children: [icon],
      attributes: [{ name: "class", value: "delete-btn-icon" }],
    };
    return span(options);
  }
}
// module.exports = new Ui(list);
module.exports = ListItemElement;
