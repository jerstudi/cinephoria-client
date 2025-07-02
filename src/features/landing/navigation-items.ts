import type { LucideIcon } from "lucide-react";
import { Film, Home, Pyramid, Tickets, User } from "lucide-react";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  iconColor?: string;
  isAuthButton?: boolean;
};

export const navigationItems: NavigationItem[] = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/reservations", label: "Réservations", icon: Tickets },
  { href: "/movies", label: "Films", icon: Film },
  // { href: "/contact", label: "Contact", icon: User },
  {
    href: "/about",
    label: "À propos",
    icon: Pyramid,
    iconColor: "text-red-500 fill-red-500",
  },
];

export const navigationItemsMobile: NavigationItem[] = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/reservations", label: "Réservations", icon: Tickets },
  { href: "/movies", label: "Films", icon: Film },
  { href: "", label: "Profil", icon: User, isAuthButton: true },
  {
    href: "/about",
    label: "À propos",
    icon: Pyramid,
    iconColor: "text-red-500 fill-red-500",
  },
];
