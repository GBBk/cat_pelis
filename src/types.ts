export type ErrorType = {
  message: string | null;
};

export type MovieType = {
  title: string;
  year: string;
  id: string;
  type: string;
  poster?: string;
};

export type AuthLogin = {
  email: string;
  password: string;
};

export type AuthSignup = {
  name: string;
  email: string;
  password: string;
  profile_pic: string;
};
