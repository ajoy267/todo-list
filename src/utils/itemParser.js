import { parseDate } from './dateParser';

export const parseItem = (item) => ({
  id: item.id,
  title: item.id,
  description: item.description,
  userId: item.user_id,
  createdAt: parseDate(item.createdAt),
});

export const parseItems = (item) => item.map(parseItem);
