import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboards from './components/Leaderboards';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-body">
          <h1 className="h3">Welcome to OctoFit Tracker</h1>
          <p className="mb-0">Browse the resources using the navigation bar above. Each page uses Bootstrap tables, buttons, cards, and forms for a consistent look.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
