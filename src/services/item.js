import { client } from './client';
import { getSession } from './users';

export async function getItems() {
  const { data: tasks, error } = await client.from('tasks').select('*');
  if (error) throw error;
  return tasks;
}

export async function getItemById(id) {
  let res = await client.from('tasks').select().match({ id }).single();
  return res;
}

export async function updateItems({ id, title, description }) {
  const res = await client
    .from('tasks')
    .update({ title, description })
    .eq('id', id);
  return res;
}

export async function addItems(title, description) {
  const { data, error } = await client.from('tasks').insert({
    title,
    description,
    user_id: (await getSession()).session.user.id,
  });
  if (error) throw error;
  return data;
}

export async function deleteItems(id) {
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
