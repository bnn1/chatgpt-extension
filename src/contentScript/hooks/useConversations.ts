import { useEffect, useState } from "react";
import { Data, Item } from "../types";
import sleep from "../../lib/utils/sleep";

const useConversations = (
  token: string | null
): [Item[], React.Dispatch<React.SetStateAction<Item[]>>] => {
  const [conversations, setConversations] = useState<Item[]>([]);

  useEffect(() => {
    const fetchConversations = async (
      limit = 100,
      offset = 0,
      size = Infinity,
      conversations: Item[] = [],
      safeguard = 10
    ): Promise<void> => {
      if (!token) throw new Error("Called without token");

      if (offset >= size || safeguard <= 0)
        return setConversations(conversations);

      safeguard -= 1;
      const response = await fetch(
        `https://chat.openai.com/backend-api/conversations?order=updated&limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: token!,
          },
        }
      );
      const data: Data = await response.json();
      size = data.total;
      conversations = conversations.concat(data.items);
      offset += data.limit;
      limit = Math.min(data.limit, size - offset);

      await sleep(300);

      return fetchConversations(limit, offset, size, conversations, safeguard);
    };
    if (token) fetchConversations();
  }, [token]);

  return [conversations, setConversations];
};

export default useConversations;
