import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- Import the new footer component
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      {/* This flex layout ensures the footer always stays pinned to the absolute bottom */}
      <div className="min-h-screen flex flex-col bg-bg-deep text-white selection:bg-gold-accent selection:text-bg-deep">
        <Navbar />
        
        {/* Main Content Area grows to take up space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer /> {/* <-- Footer gets rendered right here */}
      </div>
    </Router>
  );
}

export default App;