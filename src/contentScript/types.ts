interface Item {
  id: string;
  title: string;
  create_time: string;
  update_time: string;
  mapping: unknown;
  current_node: unknown;
}

interface Data {
  items: Item[];
  total: number;
  limit: number;
  offset: number;
  has_missing_conversations: boolean;
}

export type { Item, Data };
