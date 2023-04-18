import { client } from './client';
import { getUser } from './users';

export async function getItems() {
  const res = await client.from('tasks').select('*');
  return res;
}

export async function getItemById(id) {
  let res = await client.from('tasks').select().match({ id }).single();
  return res;
}

export async function updateItem({ id, title, description }) {
  const res = await client
    .from('tasks')
    .update({ title, description })
    .eq('id', id);
  return res;
}

export async function addItem(title, description) {
  console.log('getUser()', getUser().id);
  const { data, error } = await client
    .from('tasks')
    .insert({ title, description, user_id: getUser().id });
  if (error) throw error;
  return data;
}

export async function deleteItem(id) {
  const res = await client.from('tasks').delete().match({ id: id });
  return res;
}

export async function getUserItems() {
  const res = await client
    .from('tasks')
    .select('*')
    .match({ user_id: client.auth.user().id });
  return res;
}
