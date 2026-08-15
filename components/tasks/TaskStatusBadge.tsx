import Badge from "../ui/Badge";

type TaskStatus =
  | "todo"
  | "in_progress"
  | "completed";

type TaskStatusBadgeProps = {
  status: TaskStatus;
};

export default function TaskStatusBadge({
  status,
}: TaskStatusBadgeProps) {
  const config = {
    todo: {
      label: "Todo",
      variant: "default" as const,
    },
    in_progress: {
      label: "In Progress",
      variant: "blue" as const,
    },
    completed: {
      label: "Completed",
      variant: "green" as const,
    },
  };

  const current = config[status];

  return (
    <Badge variant={current.variant}>
      {current.label}
    </Badge>
  );
}