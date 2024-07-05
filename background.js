chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === "getTabUrl") {

    chrome.tabs.get(sender.tab.id, (tab) => {
      
      sendResponse({ url: tab.url });
    });

    return true; // Keep the message channel open for sendResponse
  }

});
