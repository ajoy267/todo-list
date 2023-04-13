import { client } from './client';

export function getUser() {
  return client.auth.getUser();
}

export function getSession() {
  return client.auth.getSession();
}

export async function signUpUser(email, password) {
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signInUser(email, password) {
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw error;
  return data;
}

export async function signOutUser() {
  return client.auth.signOut();
}
