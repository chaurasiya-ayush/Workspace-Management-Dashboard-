export default function ProjectCard({ project, onClick }) {
  const tasks = project.tasks || [];

  const total = tasks.length || 1;
  const todo = tasks.filter(t => t.status === "Todo").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const done = tasks.filter(t => t.status === "Done").length;

  const progress = Math.round((done / total) * 100);

  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-md cursor-pointer
                 hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-800">
          {project.projectName}
        </h3>
        <span className="text-xs font-semibold text-blue-600">
          {progress}%
        </span>
      </div>

      {/* TASK COUNTS */}
      <div className="grid grid-cols-3 gap-3 text-sm mb-4">
        <div className="bg-gray-100 rounded-lg p-2 text-center">
          <p className="font-semibold text-gray-700">{todo}</p>
          <p className="text-xs text-gray-500">Todo</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-2 text-center">
          <p className="font-semibold text-gray-700">{inProgress}</p>
          <p className="text-xs text-gray-500">In Progress</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-2 text-center">
          <p className="font-semibold text-gray-700">{done}</p>
          <p className="text-xs text-gray-500">Done</p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Overall Progress</span>
          <span>{done}/{total} tasks</span>
        </div>

        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r
                       from-blue-500 via-green-400 to-green-500
                       transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
