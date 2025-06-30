import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 font-poppins bg-transparent text-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm uppercase font-medium">
        {/* Left: Copyright */}
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>

        {/* Center: Developed With Love */}
        <div className="text-center tracking-wide">
          DEVELOPED WITH <span className="underline">LOVE</span>
        </div>

        {/* Right: Social Links */}
        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com/Flamiano"
            target="_blank"
            className="flex items-center gap-1 hover:text-[#5e17eb] transition"
          >
            GITHUB <ArrowUpRight size={14} />
          </Link>
          <Link
            href="https://web.facebook.com/roel.flamiano.2025"
            target="_blank"
            className="flex items-center gap-1 hover:text-[#5e17eb] transition"
          >
            FACEBOOK <ArrowUpRight size={14} />
          </Link>
          <Link
            href="https://www.instagram.com/r0w.ell"
            target="_blank"
            className="flex items-center gap-1 hover:text-[#5e17eb] transition"
          >
            INSTAGRAM <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
