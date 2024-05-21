export interface Todo {
  _id: string;
  userId?: string;
  task: string;
  description: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoState {
  todo: Todo[];
  status: "idle" | "loading" | "error";
  error: string | null;
}
