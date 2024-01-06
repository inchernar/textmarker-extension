console.log("background.js");


function init_urls_ds(){
    chrome.storage.sync.get("urls").then(result => {
        console.log(result)
        if (JSON.stringify(result) == '{}'){
            result["urls"] = {}
            chrome.storage.sync.set(result)
        }
    })
}

init_urls_ds();

chrome.storage.onChanged.addListener((changes, area) => {
    console.log(changes);
    console.log(area);
})
