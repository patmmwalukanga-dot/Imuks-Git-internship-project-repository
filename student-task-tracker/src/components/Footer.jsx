export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-card-dark py-6 mt-auto text-center z-10 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Brand Text */}
        <p className="text-xs text-text-muted tracking-wider">
          &copy; {new Date().getFullYear()} Task<span className="text-interactive-blue font-bold">Tracker</span>. All rights reserved.
        </p>

        {/* Right Side: Quick Specs / Meta */}
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase text-text-muted">
          <span>v1.0.0</span>
          <span className="opacity-30">|</span>
          <p className="tracking-wide font-bold text-text-main">BY MEGA TECH</p>
        </div>

      </div>
    </footer>
  );
}