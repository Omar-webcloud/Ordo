import Link from "next/link";

type Project = {
  _id: string;
  name: string;
  description?: string;
  members?: string[];
};

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Link
      href={`/dashboard/projects/${project._id}`}
      className="block rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700 hover:bg-slate-900/80"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-white">
          {project.name}
        </h3>

        <span className="text-slate-500">→</span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-400">
        {project.description || "No description provided."}
      </p>

      <div className="mt-5 text-xs text-slate-500">
        {project.members?.length || 0} member
        {project.members?.length === 1 ? "" : "s"}
      </div>
    </Link>
  );
}