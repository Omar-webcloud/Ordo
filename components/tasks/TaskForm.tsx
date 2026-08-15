"use client";

import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

type TaskFormProps = {
  onSubmit?: (data: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
  }) => void;
  loading?: boolean;
};

export default function TaskForm({
  onSubmit,
  loading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    onSubmit?.({
      title,
      description,
      priority,
      dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        id="task-title"
        label="Task title"
        placeholder="e.g. Design landing page"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <div>
        <label
          htmlFor="task-description"
          className="mb-2 block text-sm font-medium text-white"
        >
          Description
        </label>

        <textarea
          id="task-description"
          rows={4}
          placeholder="Describe the task..."
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="task-priority"
          className="mb-2 block text-sm font-medium text-white"
        >
          Priority
        </label>

        <select
          id="task-priority"
          value={priority}
          onChange={(event) =>
            setPriority(
              event.target.value as
                | "low"
                | "medium"
                | "high"
            )
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <Input
        id="task-due-date"
        label="Due date"
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <Button type="submit" loading={loading}>
        Create Task
      </Button>
    </form>
  );
}