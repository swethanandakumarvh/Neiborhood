import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BusinessListings from './components/BusinessListings';
import Events from './components/Events';
import ComplaintPortal from './components/ComplaintPortal';
import Announcements from './components/Announcements';
import LadiesCorner from './components/LadiesCorner';
import HelpThreads from './components/HelpThreads';
import Navigation from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/businesses" element={<BusinessListings />} />
              <Route path="/events" element={<Events />} />
              <Route path="/complaints" element={<ComplaintPortal />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/ladies-corner" element={<LadiesCorner />} />
              <Route path="/help-threads" element={<HelpThreads />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;