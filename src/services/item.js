import { client, parseData } from './client';

export async function getTasks() {
  const req = await client
    .from('tasks')
    .select()
    .order('created_at', { ascending: false });
  return parseData(req);
}

export async function getTaskById(id) {
  const req = await client.from('tasks').select().match({ id }).single();
  return parseData(req);
}

export async function updateTaskById(id, { title, description }) {
  const req = await client
    .from('tasks')
    .update({ title, description })
    .match({ id });
  return parseData(req);
}

export async function createTask({ userId, title, description }) {
  const req = await client
    .from('tasks')
    .insert({ user_id: userId, title, description });
  return parseData(req);
}

export async function deleteTaskById(id) {
  const req = await client.from('tasks').delete().match({ id });
  return parseData(req);
}
