console.log('popup.js')
chrome.action.setBadgeText({text: (0).toString()});

document.querySelector("#button_1").addEventListener("click", function(event){
  console.log('button pressed');

  let obj = {}
  let key_ss = "key 4445666";
  let value_s = "value 3331666"
  obj[key_ss] = value_s

  chrome.storage.sync.set({key_ss: value_s}).then(() => {
    chrome.storage.sync.get(["key_ss"]).then((result) => {
      console.log(result);
    })
  })

  chrome.action.getBadgeText({}).then((result) => {
    console.log(result);
    chrome.action.setBadgeText({text: (parseInt(result)+1).toString()});
  })


})


document.querySelector("#button__clear_storage").addEventListener("click", event => {
  chrome.storage.sync.clear()
})

chrome.storage.sync.getBytesInUse().then(r => {
  document.querySelector("#bytes_in_use").innerText = r
})
// document.querySelector("#button__clear_storage").addEventListener("click", event => {
//   chrome.storage.sync.clear()
// })

