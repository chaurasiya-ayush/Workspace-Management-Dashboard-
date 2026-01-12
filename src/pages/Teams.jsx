import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../context/WorkspaceContext";
import { useNavigate } from "react-router-dom";
import TeamCard from "../components/TeamCard";
import { useAuth } from "../context/AuthContext";

export default function Teams() {
  const { teams } = useContext(WorkspaceContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(9);

  /* 🔐 AUTH PROTECTION */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const visibleTeams = teams.slice(0, visibleCount);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Teams
        </h1>
        <p className="text-sm text-gray-500">
          {teams.length} teams total
        </p>
      </div>

      {/* TEAMS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTeams.map(team => (
          <TeamCard
            key={team.teamId}
            team={team}
            onClick={() => navigate(`/team/${team.teamId}`)}
          />
        ))}
      </div>

      {/* SEE MORE */}
      {visibleCount < teams.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount(prev => prev + 9)}
            className="px-6 py-2 text-sm font-medium
                       border border-gray-300 rounded-lg
                       text-gray-700 hover:bg-gray-200 transition"
          >
            See more teams
          </button>
        </div>
      )}
    </div>
  );
}
