import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full top-0 sticky z-50 bg-surface">
      <nav className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
        <Logo />
        <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md hover:opacity-90 transition-opacity active:scale-95">
          Get Started
        </button>
      </nav>
    </header>
  );
}
