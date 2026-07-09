// src/components/navbar/navbar-hook.tsx
import { usePathname } from 'next/navigation';

export function useNavbar() {
  const currentPathname = usePathname();

  return {
    currentPathname, // Make sure this is returned as an object
  };
}