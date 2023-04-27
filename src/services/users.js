import { client } from './client';

export async function getSession() {
  const { data, error } = await client.auth.getSession();
  if (error) throw error;
  return data;
}

export async function getUser() {
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
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
