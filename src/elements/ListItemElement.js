const El = require("./ElMaker.js");
const { span, textNode, li, button } = require("./ElMaker.js");
const DeleteButton = require("./DeleteButton.js");

class ListItemElement {
  constructor(item) {
    let deleteButton = new DeleteButton(item.id, "deleteItem");
    const options = {
      children: [ListItemElement.#createItemTextElement(item.value), deleteButton],
      attributes: [
        { name: "class", value: `item ${item.completed ? "completed" : ""}` },
        { name: "id", value: "id" + item.id },
        { name: "tabindex", value: 0 },
        { name: "data-id", value: item.id },
        { name: "data-completed", value: item.completed ? "true" : "" },
        { name: "data-action", value: "toggleItemCompleted" },
      ],
    };
    let el = li(options);
    el.addEventListener("focus", () => {
      deleteButton.setAttribute("tabindex", "0");
    });
    el.addEventListener("blur", () => {
      deleteButton.setAttribute("tabindex", "-1");
    });
    return el;
  }
  static #createItemTextElement(text) {
    const options = {
      children: [textNode(text)],
      attributes: [{ name: "class", value: "item-text" }],
    };
    return span(options);
  }
}

module.exports = ListItemElement;
