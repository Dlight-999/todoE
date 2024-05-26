export interface User {
  id: string;
  email: string;
}

export interface authState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "Succeeded" | "failed";
  error: string | null;
}
