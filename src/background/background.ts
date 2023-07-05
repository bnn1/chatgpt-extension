import { Actions, ExtensionState, state } from "../state/extensionState";

interface MessageWithoutPayload {
  type: Actions.GET_STATE | Actions.GET_BEARER;
  payload?: never;
}

interface MessageWithPayload {
  type: Actions.SET_STATE;
  payload: Partial<ExtensionState>;
}

type Message = MessageWithoutPayload | MessageWithPayload;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set(state);
  getBearer();
  enableActionsOnOpenAI();
  manageMessages();
});

function enableActionsOnOpenAI() {
  // Page actions are disabled by default and enabled on select tabs
  chrome.action.disable();

  // Clear all rules to ensure only our expected rules are set
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on example.com pages
    const exampleRule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostSuffix: "chat.openai.com" },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };

    // Finally, apply our new array of rules
    const rules = [exampleRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
}

function manageMessages() {
  chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
    if (message.type === Actions.GET_STATE) {
      sendResponse(state);
    }

    if (message.type === Actions.SET_STATE) {
      Object.assign(state, message.payload);
      chrome.storage.local.set(state);

      return undefined;
    }

    if (message.type === Actions.GET_BEARER) {
      chrome.storage.local.get("bearer", ({ bearer }) => {
        sendResponse(bearer);
      });
    }

    return true;
  });
}

async function getBearer() {
  const { bearer } = await chrome.storage.local.get("bearer");

  if (bearer) return;

  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      const { requestHeaders } = details;

      if (requestHeaders) {
        const bearer = requestHeaders.find(
          (header) => header.name === "Authorization"
        )?.value;

        if (bearer) {
          chrome.storage.local.set({ bearer });
        }
      }
    },
    {
      urls: ["https://chat.openai.com/*"],
    },
    ["requestHeaders"]
  );
}
