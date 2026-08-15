import type { User } from "./user";

export type ProjectMember = User | string;

export type Project = {
  _id: string;
  name: string;
  description: string;
  owner: User | string;
  members: ProjectMember[];
  createdAt: string;
  updatedAt: string;
};