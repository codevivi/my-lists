const { span, textNode, li, button } = require("./ElMaker.js");

const binSvg = document.getElementById("bin-svg");

class DeleteButton {
  constructor(thingToDeleteId, actionString) {
    const options = {
      children: [textNode("Delete"), DeleteButton.#createDeleteBtnIcon()],
      attributes: [
        { name: "class", value: "delete-btn" },
        { name: "type", value: "button" },
        { name: "data-action", value: actionString },
        { name: "data-id", value: thingToDeleteId },
        //{ name: "data-completed", value: item.completed ? "true" : "" },
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
module.exports = DeleteButton;
