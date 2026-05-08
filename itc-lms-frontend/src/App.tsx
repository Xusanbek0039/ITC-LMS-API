import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Lessons from './pages/Lessons';
import Tests from './pages/Tests';
import Certificates from './pages/Certificates';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
