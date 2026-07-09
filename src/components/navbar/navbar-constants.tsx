import { NavItem, NavbarStyles } from './navbar-types';

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const NAVBAR_CONSTRAINTS: { styles: NavbarStyles } = {
  styles: {
    backgroundColor: '#01381e',
    height: 64,
    gap: 4,
  }
} as const;