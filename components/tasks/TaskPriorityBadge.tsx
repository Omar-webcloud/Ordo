import Badge from "../ui/Badge";

type TaskPriority = "low" | "medium" | "high";

type TaskPriorityBadgeProps = {
  priority: TaskPriority;
};

export default function TaskPriorityBadge({
  priority,
}: TaskPriorityBadgeProps) {
  const config = {
    low: {
      label: "Low",
      variant: "default" as const,
    },
    medium: {
      label: "Medium",
      variant: "yellow" as const,
    },
    high: {
      label: "High",
      variant: "red" as const,
    },
  };

  const current = config[priority];

  return (
    <Badge variant={current.variant}>
      {current.label}
    </Badge>
  );
}