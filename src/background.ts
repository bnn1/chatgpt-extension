chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url?.includes("chat.openai.com")
  ) {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      (details) => {
        if (details.requestHeaders) {
          const bearer = details.requestHeaders.find(
            (header) => header.name === "Authorization"
          )?.value;
          if (bearer) {
            chrome.tabs.sendMessage(tabId, {
              type: "bearer",
              data: bearer,
            });
          }
        }

        return undefined;
      },
      { tabId, urls: ["<all_urls>"] },
      ["requestHeaders"]
    );

    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (
          details.url.includes(
            "https://chat.openai.com/backend-api/conversations"
          )
        ) {
          console.log("DETAILS URL:", details.url);
          chrome.tabs
            .sendMessage(tabId, {
              type: "request",
              data: details.url,
            })
            .then(console.log);

          return undefined;
        }
      },
      { tabId, urls: ["<all_urls>"] }
    );
  }
});
