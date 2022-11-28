const fileIdentifier = "list#39"; //will insert this at the beginning of the file when saving to fi

module.exports.getFromFile = function getFromFile(file) {
  if (file) {
    if (!file.name.endsWith(".txt")) {
      alert("Wrong file type.");
      inputFile.value = "";
      return;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        let result = reader.result;
        if (!result.startsWith(fileIdentifier)) {
          alert("Wrong file type.Can only open files saved with this application.");
          inputFile.value = "";
          return;
        }
        result = result.substring(fileIdentifier.length);
        result = JSON.parse(result);
        resolve(result);
        reader.onerror = reject;
      };
    });
  }
};

function createDownloadFile(filename, text) {
  const element = document.createElement("a");
  element.innerText = "download";
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

module.exports.saveToFile = function downLoadFile(name, content) {
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = `${today.getFullYear().toString()}-${month.toString()}-${today.getDate().toString()}_T_${today.getHours().toString()}-${today.getMinutes().toString()}-${today.getSeconds().toString()}`;
  let fileName = `My_lists_${date}.txt`;
  createDownloadFile(fileName, fileIdentifier + JSON.stringify(content));
};
