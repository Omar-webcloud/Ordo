import Link from "next/link";

import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string | null;
};

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({
  task,
}: TaskCardProps) {
  return (
    <Link
      href={`/dashboard/tasks/${task._id}`}
      className="block rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-medium text-white">
          {task.title}
        </h3>

        <TaskStatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className="mt-3 line-clamp-2 text-sm text-slate-400">
          {task.description}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between">
        <TaskPriorityBadge priority={task.priority} />

        <span className="text-xs text-slate-500">
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No deadline"}
        </span>
      </div>
    </Link>
  );
}