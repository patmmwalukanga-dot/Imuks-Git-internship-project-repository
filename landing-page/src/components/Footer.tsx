import Logo from "./Logo";

const FOOTER_LINKS: string[] = ["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"];

export default function Footer() {
  return (
    <footer className="w-full bg-surface py-20 border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-stack-lg">
        <div className="flex flex-col items-center md:items-start gap-base">
          <Logo />
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs text-center md:text-left">
            Empowering students to reach their full potential through organizational excellence.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-stack-md font-body-sm text-body-sm text-on-surface-variant">
          {FOOTER_LINKS.map((link) => (
            <a key={link} href="#" className="hover:underline hover:text-primary transition-all">
              {link}
            </a>
          ))}
        </div>
        <div className="text-center md:text-right">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 Scholarly Tracker. All academic rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
