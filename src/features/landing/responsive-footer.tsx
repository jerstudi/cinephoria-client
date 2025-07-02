"use client";

import { useEffect, useState } from "react";
import { Footer } from "../layout/footer";
import { LandingMenuM } from "./landing-menu-m";

type Props = {
  breakpoint?: number;
};

export function ResponsiveFooter({ breakpoint = 768 }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint); // md breakpoint
    };

    // Check initial size
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile ? <LandingMenuM /> : <Footer />;
}
