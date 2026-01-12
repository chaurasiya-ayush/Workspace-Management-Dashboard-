export default function TeamCard({ team, onClick }) {
  // Collect all tasks from all projects
  const allTasks = team.projects.flatMap(p => p.tasks);

  const totalProjects = team.projects.length;
  const totalTasks = allTasks.length || 1;

  // Status counts
  const statusCount = allTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const done = statusCount["Done"] || 0;
  const progress = Math.round((done / totalTasks) * 100);

  // Status meta (icon + color)
  const STATUS_META = {
    Backlog: { icon: "🗂️", color: "text-purple-600" },
    Todo: { icon: "⏳", color: "text-orange-600" },
    "In Progress": { icon: "🔄", color: "text-blue-600" },
    Blocked: { icon: "⛔", color: "text-red-600" },
    Done: { icon: "✅", color: "text-green-600" },
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-6
                 cursor-pointer hover:shadow-md
                 hover:border-gray-300 transition"
    >
      {/* TEAM NAME */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        {team.teamName}
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div>
          <p className="font-semibold text-gray-800">
            {totalProjects}
          </p>
          <p className="text-xs">Projects</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {totalTasks}
          </p>
          <p className="text-xs">Tasks</p>
        </div>
      </div>

      {/* STATUS BREAKDOWN (ICONS) */}
      <div className="space-y-1 text-xs mb-4">
        {Object.entries(statusCount).map(([status, count]) => {
          const meta = STATUS_META[status];
          return (
            <div
              key={status}
              className="flex items-center justify-between"
            >
              <span className={`flex items-center gap-2 ${meta?.color}`}>
                <span>{meta?.icon}</span>
                <span className="text-gray-600">{status}</span>
              </span>
              <span className="text-gray-700 font-medium">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* PROGRESS */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Completion</span>
          <span className="font-medium text-gray-700">
            {progress}%
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-gray-800 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
