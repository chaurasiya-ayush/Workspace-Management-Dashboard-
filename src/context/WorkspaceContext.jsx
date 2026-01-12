import { createContext, useState } from "react";
import { workspaceData } from "../data/workspaceData";

export const WorkspaceContext = createContext();

export function WorkspaceProvider({ children }) {
  const [teams, setTeams] = useState(workspaceData);

  const updateTaskStatus = (teamId, projectId, taskId, newStatus) => {
    setTeams(prev =>
      prev.map(team =>
        team.teamId === teamId
          ? {
              ...team,
              projects: team.projects.map(project =>
                project.projectId === projectId
                  ? {
                      ...project,
                      tasks: project.tasks.map(task =>
                        task.id === taskId
                          ? { ...task, status: newStatus }
                          : task
                      )
                    }
                  : project
              )
            }
          : team
      )
    );
  };

  return (
    <WorkspaceContext.Provider value={{ teams, updateTaskStatus }}>
      {children}
    </WorkspaceContext.Provider>
  );
}
