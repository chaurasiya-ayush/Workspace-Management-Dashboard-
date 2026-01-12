import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import TaskBoard from "./pages/TaskBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
             <Teams />
          </ProtectedRoute>
        }
      />

      <Route
        path="/team/:teamId"
        element={
          <ProtectedRoute>
            <TeamDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/team/:teamId/project/:projectId"
        element={
          <ProtectedRoute>
            <TaskBoard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

// import React from 'react'

// function App() {
//   return (
//     <div>
//       <h1 className='bg-amber-800 '>
//       lkjhloihnlhnih
//       </h1>
//     </div>
//   )
// }

// export default App
