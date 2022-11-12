chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
      tabId,
    });
  }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === "tab_close_msg") {
      chrome.tabs.query({
          currentWindow: true,
          active: true
      }, function (tabs) {
          chrome.tabs.remove(tabs[0].id);
      });
  }
});

