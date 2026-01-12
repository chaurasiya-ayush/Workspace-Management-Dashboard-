import { useContext } from "react";
import { WorkspaceContext } from "../context/WorkspaceContext";
import { useParams, useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

export default function TeamDetails() {
  const { teams } = useContext(WorkspaceContext);
  const { teamId } = useParams();
  const navigate = useNavigate();

  const team = teams.find(t => t.teamId === teamId);

  // 🛡️ Safety check (invalid URL or data not loaded)
  if (!team) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Team not found</p>
        <button
          onClick={() => navigate("/teams")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Teams
        </button>
      </div>
    );
  }

  // 📊 Team-level stats
  const allTasks = team.projects.flatMap(p => p.tasks);
  const totalProjects = team.projects.length;
  const totalTasks = allTasks.length;
  const doneTasks = allTasks.filter(t => t.status === "Done").length;
  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* 🔝 HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => navigate("/teams")}
            className="text-sm text-blue-600 mb-2 hover:underline"
          >
            ← Back to Teams
          </button>
          <h1 className="text-3xl font-bold">{team.teamName}</h1>
        </div>

        {/* QUICK STATS */}
        <div className="flex gap-6 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-800">{totalProjects}</p>
            <p>Projects</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{totalTasks}</p>
            <p>Tasks</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{completionRate}%</p>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* 🧩 PROJECTS GRID */}
      {team.projects.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          No projects available for this team.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.projects.map(project => (
            <ProjectCard
              key={project.projectId}
              project={project}
              onClick={() =>
                navigate(
                  `/team/${teamId}/project/${project.projectId}`
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
