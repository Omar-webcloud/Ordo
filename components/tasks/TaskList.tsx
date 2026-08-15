import TaskCard from "./TaskCard";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string | null;
};

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({
  tasks,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">
        <p className="text-slate-400">
          No tasks found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
        />
      ))}
    </div>
  );
}