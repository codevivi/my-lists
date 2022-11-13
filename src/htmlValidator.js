const validator = require("html-validator");
const htmlValidator = async function () {
  console.log("validating html");
  const options = {
    data: document.querySelector("body").innerHTML,
    //url: "http://127.0.0.1:5500/myList/index.html",
    format: "text",
    //isLocal: true,
    isFragment: true,
  };
  try {
    const result = await validator(options);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
module.exports = htmlValidator;
