"use client";

import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

type ProjectFormProps = {
  onSubmit?: (data: {
    name: string;
    description: string;
  }) => void;
  loading?: boolean;
};

export default function ProjectForm({
  onSubmit,
  loading = false,
}: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.({
      name,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        id="project-name"
        label="Project name"
        placeholder="e.g. Website Redesign"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <div>
        <label
          htmlFor="project-description"
          className="mb-2 block text-sm font-medium text-white"
        >
          Description
        </label>

        <textarea
          id="project-description"
          rows={4}
          placeholder="What is this project about?"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      <Button type="submit" loading={loading}>
        Create Project
      </Button>
    </form>
  );
}