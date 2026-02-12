import supabase, { supabaseUrl } from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentSession() {
  const { data: session, error } = await supabase.auth.getSession();
  if (session.session === null) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}

export async function signup({
  name,
  email,
  password,
  profile_pic,
}: {
  name: string;
  email: string;
  password: string;
  profile_pic: string;
}) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);
  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
