import ProjectCard from "./ProjectCard";

type Project = {
  _id: string;
  name: string;
  description?: string;
  members?: string[];
};

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({
  projects,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">
        <p className="text-slate-400">
          No projects found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
        />
      ))}
    </div>
  );
}