import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-bg-pure text-text-main min-h-screen flex flex-col">
      
      {/* SECTION 1: HERO CONTAINER */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center relative overflow-hidden border-b border-border-subtle">
        {/* Sleek Minimalist Radial Background Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,34,42,0.15)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="max-w-3xl z-10 flex flex-col items-center">
          {/* Workspace Status Tag */}
          <span className="px-3.5 py-1 text-xs font-medium tracking-widest text-text-muted uppercase bg-card-dark border border-border-subtle rounded-full mb-6">
            Workspace Hub
          </span>

          {/* Title Statement */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-main leading-tight">
            Organize Your Student Life <br />
            <span className="text-text-muted">Efficiently.</span>
          </h1>

          {/* Context Line */}
          <p className="mt-6 text-sm sm:text-base text-text-muted max-w-lg leading-relaxed">
            Track academic timelines, structure task milestones, and manage workflows within a premium minimalist terminal grid environment.
          </p>

          {/* Tactical Primary Action Button with Electric Blue Hover */}
          <div className="mt-10">
            <Link 
              to="/dashboard" 
              className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-wider bg-text-main text-bg-pure rounded-xl border border-transparent transition-all duration-300 hover:bg-bg-pure hover:text-interactive-blue hover:border-interactive-blue hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: GRID MODULAR FEATURE BLOCKS */}
      <section className="py-20 px-6 bg-card-dark/20 border-b border-border-subtle relative flex-grow">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Separation */}
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">System Overview</h2>
            <p className="text-2xl sm:text-3xl font-extrabold mt-2 text-text-main">Engineered for Structural Productivity</p>
          </div>

          {/* Matte Grid Arrays closely matching workout layout containers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature Module 1 */}
            <div className="bg-card-dark border border-border-subtle p-8 rounded-2xl transition-all duration-300 group hover:border-interactive-blue/40">
              <div className="text-xl mb-4 text-text-muted group-hover:text-interactive-blue transition-colors">01 / PIPELINE</div>
              <h3 className="text-lg font-bold text-text-main mb-2">Task Pipeline</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Organize, adjust, and prioritize your active semester tasks using clean internal workflow tracking.
              </p>
            </div>

            {/* Feature Module 2 */}
            <div className="bg-card-dark border border-border-subtle p-8 rounded-2xl transition-all duration-300 group hover:border-interactive-blue/40">
              <div className="text-xl mb-4 text-text-muted group-hover:text-interactive-blue transition-colors">02 / CONTROLS</div>
              <h3 className="text-lg font-bold text-text-main mb-2">Deadline Metrics</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Stay clearly ahead of recurring academic course timelines using unified delivery alerts.
              </p>
            </div>

            {/* Feature Module 3 */}
            <div className="bg-card-dark border border-border-subtle p-8 rounded-2xl transition-all duration-300 group hover:border-interactive-blue/40">
              <div className="text-xl mb-4 text-text-muted group-hover:text-interactive-blue transition-colors">03 / ANALYTICS</div>
              <h3 className="text-lg font-bold text-text-main mb-2">Completion Ratios</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Analyze operational performance data indicators immediately via simple, clean dashboard telemetry layouts.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}