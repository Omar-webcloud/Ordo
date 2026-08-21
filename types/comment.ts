import type { User } from "./user";

export type Comment = {
  _id: string;
  task: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt: string;
};
