import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bearerToken, setBearerToken] = useState<string>();
  // const [requests, setRequests] = useState<Set<string>>(new Set());
  const [conversations, setConversations] = useState<any[]>([]);

  const handleMessage = useCallback(
    (message: { type: "bearer" | "request"; data: any }) => {
      switch (message.type) {
        case "bearer":
          setBearerToken(message.data);
          break;
      }

      return undefined;
    },
    []
  );

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (bearerToken) {
      const fetchConversations = async (
        limit = 100,
        offset = 0,
        size = Infinity,
        conversations = [],
        safeguard = 10
      ): Promise<void> => {
        if (offset >= size || safeguard <= 0)
          return setConversations(conversations);

        safeguard -= 1;
        const response = await fetch(
          `https://chat.openai.com/backend-api/conversations?order=updated&limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: bearerToken,
            },
          }
        );
        const data = await response.json();
        size = data.total;
        conversations = conversations.concat(data.items);
        offset += data.limit;
        limit = Math.min(data.limit, size - offset);

        return fetchConversations(
          limit,
          offset,
          size,
          conversations,
          safeguard
        );
      };
      fetchConversations();
    }
  }, [bearerToken]);

  useEffect(() => {
    if (conversations.length > 0 && bearerToken) {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          "li > a.flex.py-3.px-3.items-center.gap-3.relative.rounded-md.cursor-pointer.break-all"
        )
      );
      elements.forEach((element, idx) => {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.value = conversations[idx].id;
        input.onclick = (e) => e.stopPropagation();
        element.prepend(input);
      });
      console.log("ELEMENTS:", elements);
      const nav = document.querySelector("nav > div.mb-1.flex.flex-row.gap-2");
      if (nav) {
        const button = document.createElement("button");
        button.innerText = "Delete";

        button.onclick = () => {
          const inputs = Array.from(
            document.querySelectorAll<HTMLInputElement>("input[type=checkbox]")
          );

          const deletes = inputs.map((input) => {
            if (input.checked) {
              const id = input.value;
              return fetch(
                `https://chat.openai.com/backend-api/conversation/${id}`,
                {
                  method: "PATCH",
                  headers: {
                    Authorization: bearerToken,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    is_visible: false,
                  }),
                }
              ).then(() => new Promise((resolve) => setTimeout(resolve, 200)));
            }
          });
          Promise.all(deletes).then(() => window.location.reload());
        };
        nav.appendChild(button);
      }
    }
  }, [conversations, bearerToken]);

  console.log("CONVERSATIONS:", conversations);
  return null;
}

export default App;
