import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar.jsx';
import HomePage from './components/Home.jsx';
import ProblemsPage from './components/ProblemsPage.jsx';
import About from './components/About.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemsPage />} /> 
        <Route path="/problem/:id" element={<ProblemsPage />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
