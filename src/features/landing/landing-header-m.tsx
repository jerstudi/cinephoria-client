"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthButtonClient } from "../auth/auth-button-client";
import { navigationItemsMobile } from "./navigation-items";

export function LandingHeaderM() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const isPathActive = (path: string) => pathname === path;

  // Ajouter/retirer la classe CSS pour le padding en bas
  useEffect(() => {
    setIsClient(true);
    document.body.classList.add("pb-20");

    return () => {
      document.body.classList.remove("pb-20");
    };
  }, []);

  // Ne pas rendre tant que nous ne sommes pas côté client
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Header en haut */}
      <motion.header className="fixed inset-x-0 top-0 z-50 flex h-20 w-screen shadow backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-1">
            {/* <LogoSvg size={24} /> */}
            <Image
              src={"/assets/svg/Logo_full_a.svg"}
              width={100}
              height={100}
              className="size-32"
              alt="Logo"
            />
          </div>
        </div>
      </motion.header>

      {/* Barre de navigation en bas */}
      <motion.nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="flex items-center justify-around p-2">
          {navigationItemsMobile.map((item) => {
            const Icon = item.icon;

            // Si c'est le bouton d'authentification, afficher un bouton personnalisé
            if (item.isAuthButton) {
              return (
                <div key={item.href} className="">
                  <AuthButtonClient />
                </div>
              );
            }

            // Sinon, afficher un lien normal
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                  isPathActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    item.iconColor &&
                      !isPathActive(item.href) &&
                      item.iconColor,
                    isPathActive(item.href) && item.label === "À propos"
                      ? "fill-red-500 stroke-none"
                      : "",
                  )}
                />
                {/* <span className="text-xs font-medium">{item.label}</span> */}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
