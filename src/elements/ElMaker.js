class El {
  constructor() {}
  static textNode(text) {
    return document.createTextNode(text);
  }
  static span(options) {
    let span = document.createElement("span");
    options.children.forEach((child) => {
      span.appendChild(child);
    });
    options.attributes.forEach((attr) => {
      span.setAttribute(attr.name, attr.value);
    });
    return span;
  }
  static h1(options) {
    let h1 = document.createElement("h1");
    options.children.forEach((child) => {
      h1.appendChild(child);
    });
    options.attributes.forEach((attr) => {
      h1.setAttribute(attr.name, attr.value);
    });
    return h1;
  }
  static li(options) {
    let li = document.createElement("li");
    options.children.forEach((child) => {
      li.appendChild(child);
    });
    options.attributes.forEach((attr) => {
      li.setAttribute(attr.name, attr.value);
    });
    return li;
  }
  static button(options) {
    let button = document.createElement("button");
    options.children.forEach((child) => {
      button.appendChild(child);
    });
    options.attributes.forEach((attr) => {
      button.setAttribute(attr.name, attr.value);
    });
    return button;
  }
}
module.exports = El;
