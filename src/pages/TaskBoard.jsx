import { useContext } from "react";
import { WorkspaceContext } from "../context/WorkspaceContext";
import { useParams, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

/* -------------------- STATUS CONFIG -------------------- */
const STATUSES = [
  "Backlog",
  "Todo",
  "In Progress",
  "Blocked",
  "Done",
];

const STATUS_COLORS = {
  Backlog: "bg-purple-100 text-purple-700",
  Todo: "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Blocked: "bg-red-100 text-red-700",
  Done: "bg-green-100 text-green-700",
};

export default function TaskBoard() {
  const { teams, updateTaskStatus } = useContext(WorkspaceContext);
  const { teamId, projectId } = useParams();
  const navigate = useNavigate();

  const team = teams.find(t => t.teamId === teamId);
  const project = team?.projects.find(p => p.projectId === projectId);

  /* 🛡️ SAFETY CHECK */
  if (!team || !project) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Project not found</p>
        <button
          onClick={() => navigate("/teams")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Teams
        </button>
      </div>
    );
  }

  /* 🔁 STATUS FLOW */
  const getNextStatus = status => {
    const index = STATUSES.indexOf(status);
    return STATUSES[index + 1] || status;
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => navigate(`/team/${teamId}`)}
            className="text-sm text-blue-600 mb-2 hover:underline"
          >
            ← Back to Projects
          </button>
          <h1 className="text-3xl font-bold">
            {project.projectName}
          </h1>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {STATUSES.map(status => (
          <div key={status} className="bg-white rounded-xl shadow p-4">
            {/* COLUMN HEADER */}
            <div
              className={`text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4
                          ${STATUS_COLORS[status]}`}
            >
              {status}
            </div>

            {/* TASKS */}
            <div className="space-y-4">
              {project.tasks
                .filter(task => task.status === status)
                .map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onMove={() =>
                      updateTaskStatus(
                        teamId,
                        projectId,
                        task.id,
                        getNextStatus(task.status)
                      )
                    }
                  />
                ))}

              {/* EMPTY STATE */}
              {project.tasks.filter(t => t.status === status).length === 0 && (
                <p className="text-xs text-gray-400">
                  No tasks
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
