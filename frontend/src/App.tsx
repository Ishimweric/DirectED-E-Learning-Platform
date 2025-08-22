// src/App.tsx
// The main entry point for the application.
// It wraps the entire application with the necessary providers.

import React from 'react';
import StudentDashboard from './pages/StudentDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DashboardProvider>
        <StudentDashboard />
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
