import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b border-border-subtle bg-bg-pure px-6 py-4 flex justify-between items-center z-20 relative">
      <Link to="/" className="text-base font-bold tracking-widest uppercase text-text-main hover:text-interactive-blue transition duration-300">
        STUDENT // <span className="text-text-muted group-hover:text-interactive-blue">TRACKER</span>
      </Link>
      <div className="flex gap-6">
        <Link to="/" className="text-xs font-bold uppercase tracking-wider text-text-muted hover:text-text-main transition py-2">
          Overview
        </Link>
        <Link 
          to="/dashboard" 
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-card-dark text-text-main border border-border-subtle rounded-xl transition-all duration-300 hover:border-interactive-blue hover:text-interactive-blue"
        >
          Workspace
        </Link>
      </div>
    </nav>
  );
}