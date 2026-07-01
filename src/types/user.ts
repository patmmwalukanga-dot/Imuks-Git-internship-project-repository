export type UserProfile = {
  id: string;
  name: string;
  email: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  status?: string;
};