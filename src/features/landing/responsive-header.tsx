"use client";

import { useEffect, useState } from "react";
import { LandingHeader } from "./landing-header";
import { LandingHeaderM } from "./landing-header-m";

type Props = {
  breakpoint?: number;
};

export function ResponsiveHeader({ breakpoint = 768 }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };

    // Check initial size
    checkScreenSize();

    // Add event listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkScreenSize);

      // Cleanup
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, [breakpoint]);

  // Ne pas rendre tant que nous ne sommes pas côté client
  if (!isClient) {
    return <LandingHeader />; // Fallback par défaut
  }

  return isMobile ? <LandingHeaderM /> : <LandingHeader />;
}
