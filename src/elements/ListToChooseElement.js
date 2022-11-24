const { span, textNode, li, button } = require("./ElMaker.js");
const El = require("./ElMaker");

class ListToChooseElement {
  constructor(list) {
    const options = {
      children: [El.textNode(`${list.name} (${list.itemsUndone.length})`)],
      attributes: [
        { name: "class", value: `list-to-choose` },
        { name: "data-id", value: list.id },
        { name: "data-action", value: "selectList" },
      ],
    };
    let el = li(options);
    return el;
  }
}
module.exports = ListToChooseElement;
