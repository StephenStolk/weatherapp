chrome.runtime.onInstalled.addListener(() => {
    console.log("Weather extension installed.");
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({url: chrome.runtime.getURL("popup.html")});
  });
  