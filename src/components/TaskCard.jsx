export default function TaskCard({ task, onMove }) {
  const statusText = {
    Backlog: "text-purple-600",
    Todo: "text-orange-600",
    "In Progress": "text-blue-600",
    Blocked: "text-red-600",
    Done: "text-green-600",
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";

  return (
    <div
      className="bg-white p-3 rounded-lg border border-gray-200
                 hover:bg-gray-50 transition"
    >
      {/* TITLE */}
      <p className="text-sm font-medium text-gray-900 mb-1">
        {task.title}
      </p>

      {/* STATUS + PRIORITY (TEXT ONLY) */}
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
        <span className={statusText[task.status]}>
          {task.status}
        </span>

        {task.priority && (
          <span className="text-gray-400">
            {task.priority}
          </span>
        )}

        {isOverdue && (
          <span className="text-red-500">
            overdue
          </span>
        )}
      </div>

      {/* META */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        {/* ASSIGNEE */}
        <span>{task.assignee}</span>

        {/* DUE DATE */}
        {task.dueDate && (
          <span className={isOverdue ? "text-red-500" : ""}>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* ACTION */}
      {task.status !== "Done" && (
        <button
          onClick={onMove}
          className="mt-2 text-xs text-blue-600
                     hover:underline"
        >
          Move →
        </button>
      )}
    </div>
  );
}
