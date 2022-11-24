const { span, h1, textNode, li, button } = require("./ElMaker.js");
const DeleteButton = require("./DeleteButton.js");

class ListTitleElement {
  constructor(list) {
    const options = {
      children: [ListTitleElement.#listNameText(list), new DeleteButton(list.id, "deleteList")],
      attributes: [
        { name: "class", value: `list-name` },
        { name: "data-id", value: list.id },
      ],
    };
    let el = h1(options);
    return el;
  }
  static #listNameText(list) {
    const options = {
      children: [textNode(list.name)],
      attributes: [
        { name: "class", value: `list-name-text` },
        { name: "data-id", value: list.id },
      ],
    };
    let el = span(options);
    return el;
  }
}
module.exports = ListTitleElement;
