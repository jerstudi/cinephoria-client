"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LandingMenuM() {
  return (
    <motion.nav className="fixed inset-x-0 z-50 flex h-20 w-screen shadow backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-1">
          <Image
            src={"/assets/svg/Logo_full_a.svg"}
            width={100}
            height={100}
            className="size-32"
            alt="Logo"
          />
        </div>
      </div>
    </motion.nav>
  );
}
