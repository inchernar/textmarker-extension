console.log("content-script.js");


function clear_selection(){
    // clear selection
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE?
        document.selection.empty();
    }
}

function markSelected(){
    // Достаём объет выделения
    selected = (document.all) ? document.selection.createRange().text : document.getSelection();

    selectedText = selected.toString();

    // Проверяем, что выделение не пустое, дабы не плодить тегов
    if (selectedText == "") {
        return;
    }
    console.log(typeof(selected));

    let mark = document.createElement('x-marker');
    mark.textContent = selectedText;

    let range = selected.getRangeAt(0);
    range.deleteContents();
    range.insertNode(mark);

    clear_selection();

    const currUrl = decodeURI(document.location.href)
    chrome.storage.sync.get("urls").then(result => {
        if (!(currUrl in result["urls"])){
            result["urls"][currUrl] = []
        }
        result["urls"][currUrl].push(selectedText)
        chrome.storage.sync.set(result);
    })
}

document.querySelector('html').addEventListener("mouseup", markSelected)
