import { Actions, ExtensionState, state } from "../state/extensionState";

interface MessageWithoutPayload {
  type: Actions.GET_STATE;
  payload?: never;
}

interface MessageWithPayload {
  type: Actions.SET_STATE;
  payload: Partial<ExtensionState>;
}

type Message = MessageWithoutPayload | MessageWithPayload;

chrome.runtime.onInstalled.addListener(() => {
  enableActionsOnOpenAI();
  manageLocalStorage();
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

function manageLocalStorage() {
  chrome.storage.local.set(state);

  chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
    if (message.type === Actions.GET_STATE) {
      sendResponse(state);
    }

    if (message.type === Actions.SET_STATE) {
      Object.assign(state, message.payload);
      chrome.storage.local.set(state);
    }
  });
}
