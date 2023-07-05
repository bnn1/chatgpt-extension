import { useEffect, useState } from "react";
import { Actions } from "../../state/extensionState";

const useCookie = (cookieName: string) => {
  const [cookie, setCookie] = useState<string | null>(null);

  useEffect(() => {
    if (chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        { type: Actions.GET_BEARER, payload: cookieName },
        (response) => {
          setCookie(response);
        }
      );
    }
  }, [cookieName]);

  return cookie;
};

export default useCookie;
