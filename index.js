

function doGET(path, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()  {
        if (xhr.readyState == 4) {
            // The request is done; did it work?
            if (xhr.status == 200) {
                // ***Yes, use `xhr.responseText` here***
                callback(xhr.responseText);
            } else {
                // ***No, tell the callback the call failed***
                callback(null);
            }
        }
    };
    xhr.open("GET", path);
    xhr.overrideMimeType('text/plain; charset=windows-1251');
    xhr.send();
}

function handleFileData(fileData) {

    if (!fileData) {
        console.log("Внимание, невалидное содержимое ответа!");
        return;
    }

    function respondKeyEvent (event) {

      const siblingsCompareMap = {
        "ArrowUp":'previousSibling',
        "ArrowDown":'nextSibling',
      };

      const firstLastCompareMap = {
        "Home":'firstElementChild',
        "End":'lastElementChild',
      };
      
      if(siblingsCompareMap[event.key]){
        event.preventDefault();
        this[siblingsCompareMap[event.key]].focus()
      } else if (firstLastCompareMap[event.key]) {
        this.parentNode[firstLastCompareMap[event.key]].focus()
      }
    }

    const createListIem = function (item){
        let div = document.createElement('div');
        div.innerHTML = item;
        div.className = "item";
        div.tabIndex = 0;
        div.onkeydown = respondKeyEvent;
        return div
    };

    const list = fileData.split("\r\n\r\n\r\n").map(createListIem);
    document.body.append(...list);
}

// Do the request
doGET("./resources/res.txt", handleFileData);