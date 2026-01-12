import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../context/WorkspaceContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* -------------------- STATUS CONFIG -------------------- */
const STATUS_COLORS = {
  Todo: "#f97316",
  "In Progress": "#3b82f6",
  Done: "#22c55e",
  Blocked: "#ef4444",
  Backlog: "#a855f7",
};

export default function Dashboard() {
  const { teams } = useContext(WorkspaceContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* -------------------- AUTH PROTECTION -------------------- */
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  /* -------------------- DATA CALCULATIONS -------------------- */

  const totalTeams = teams.length;

  const totalProjects = teams.reduce(
    (acc, team) => acc + team.projects.length,
    0
  );

  const allTasks = teams.flatMap(team =>
    team.projects.flatMap(project => project.tasks)
  );

  const totalTasks = allTasks.length;

  // 🔹 Dynamic task stats (supports any status)
  const taskStats = allTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(((taskStats["Done"] || 0) / totalTasks) * 100);

  /* -------------------- CHART DATA -------------------- */

  // Donut Chart
  const donutData = Object.entries(taskStats).map(
    ([status, value]) => ({
      name: status,
      value,
    })
  );

  // Projects per Team
  const projectsBarData = teams.map(team => ({
    name: team.teamName,
    projects: team.projects.length,
  }));

  // Team-wise stacked bar (dynamic statuses)
  const stackedBarData = teams.map(team => {
    const tasks = team.projects.flatMap(p => p.tasks);

    const statusMap = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    return {
      name: team.teamName,
      ...statusMap,
    };
  });

  /* -------------------- LOGOUT -------------------- */

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-gray-700">
            {user?.email}
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg
                       hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-5 gap-6 mb-12">
        <StatCard title="Teams" value={totalTeams} />
        <StatCard title="Projects" value={totalProjects} />
        <StatCard title="Tasks" value={totalTasks} />
        <StatCard title="Completion" value={`${completionRate}%`} />
        <StatCard
          title="Blocked Tasks"
          value={taskStats["Blocked"] || 0}
        />
      </div>

      {/* TOP GRAPHS */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* DONUT CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Task Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                label
              >
                {donutData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={STATUS_COLORS[entry.name]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* PROJECTS PER TEAM */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Projects per Team
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={projectsBarData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="projects"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* STACKED BAR */}
      
    </div>
  );
}

/* -------------------- COMPONENTS -------------------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
