"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  GraduationCap,
  Folder,
  Wrench,
  MapPin,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SoundTogglePortal } from "./sound-toggler/SoundTogglePortal";

// Main Navbar component
export const Navbar = () => {
  const [stage, setStage] = useState<"closed" | "logo" | "color" | "nav">(
    "closed"
  );
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Music player
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (["nav", "logo", "color"].includes(stage)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [stage]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
      audio.muted = false;

      const play = () => {
        audio.currentTime = 0;
        audio.play().catch((err) => console.log("Autoplay failed:", err));
      };

      play();

      const unlockAudio = () => {
        play();
        window.removeEventListener("click", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      };

      window.addEventListener("click", unlockAudio);
      window.addEventListener("touchstart", unlockAudio);

      return () => {
        window.removeEventListener("click", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      };
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const openMenu = () => {
    setStage("logo");
    setTimeout(() => {
      setStage("color");
      setTimeout(() => {
        setStage("nav");
      }, 600);
    }, 800);
  };

  const closeMenu = () => setStage("closed");

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showNav ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-poppins ${
        scrolled ? "bg-transparent" : "bg-transparent"
      }`}
    >
      {/* Background Music */}
      <audio ref={audioRef} src="/music/NewYork.mp3" autoPlay loop />

      {/* MOBILE SOUND TOGGLE */}
      <SoundTogglePortal isMuted={isMuted} toggleMute={toggleMute} />

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </Link>

        <div className="md:hidden z-50">
          {stage === "closed" ? (
            <button onClick={openMenu} className="text-[#5e17eb]">
              <Menu size={24} />
            </button>
          ) : (
            <button onClick={closeMenu} className="text-[#5e17eb]">
              <X size={24} />
            </button>
          )}
        </div>

        {/* Desktop Nav + SOUND toggle beside it */}
        <nav className="hidden md:flex bg-[#5e17eb] rounded-full px-6 py-2 items-center justify-center gap-5 shadow-md">
          <NavLinks />
          <motion.span
            onClick={toggleMute}
            whileTap={{ scale: 0.95 }}
            className="text-white text-xs cursor-pointer select-none"
          >
            SOUND [ {isMuted ? "OFF" : "ON"} ]
          </motion.span>
        </nav>
      </div>

      <AnimatePresence>
        {stage === "logo" && (
          <motion.div
            key="logo-stage"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white flex items-center justify-center h-screen"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/logo.png"
                alt="Centered Logo"
                width={180}
                height={180}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "color" && (
          <motion.div
            key="color-slide"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-[#5e17eb] h-screen"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "nav" && (
          <motion.div
            key="nav-stage"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-white px-6 flex flex-col items-center pt-6 h-screen"
          >
            <Image
              src="/logo.png"
              alt="Top Logo"
              width={100}
              height={100}
              className="mb-[-4.5rem]"
            />
            <div className="flex-1 flex flex-col justify-center items-center w-full">
              <div className="flex flex-col gap-5 items-center text-lg font-semibold text-[#5e17eb] w-full max-w-[280px]">
                <MobileLink
                  href="#home"
                  icon={<Home size={20} />}
                  label="Home"
                  onClick={closeMenu}
                />
                <MobileLink
                  href="#education"
                  icon={<GraduationCap size={20} />}
                  label="Education"
                  onClick={closeMenu}
                />
                <MobileLink
                  href="#projects"
                  icon={<Folder size={20} />}
                  label="Projects"
                  onClick={closeMenu}
                />
                <MobileLink
                  href="#techstack"
                  icon={<Wrench size={20} />}
                  label="Tech Stack"
                  onClick={closeMenu}
                />
                <MobileLink
                  href="#offerings"
                  icon={<Settings size={20} />}
                  label="Offers"
                  onClick={closeMenu}
                />
                <MobileLink
                  href="#contact"
                  icon={<MapPin size={20} />}
                  label="Contact"
                  onClick={closeMenu}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Desktop NavLinks
const NavLinks = () => (
  <>
    <Link href="#home" className="text-white hover:text-gray-200">
      <Home size={20} />
    </Link>
    <Link href="#education" className="text-white hover:text-gray-200">
      <GraduationCap size={20} />
    </Link>
    <Link href="#projects" className="text-white hover:text-gray-200">
      <Folder size={20} />
    </Link>
    <Link href="#techstack" className="text-white hover:text-gray-200">
      <Wrench size={20} />
    </Link>
    <Link href="#offerings" className="text-white hover:text-gray-200">
      <Settings size={20} />
    </Link>
    <Link href="#contact" className="text-white hover:text-gray-200">
      <MapPin size={20} />
    </Link>
  </>
);

// Mobile NavLinks
interface MobileLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const MobileLink: React.FC<MobileLinkProps> = ({
  href,
  icon,
  label,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-4 py-4 border border-[#5e17eb] rounded-lg hover:bg-[#f3ebff] transition text-left"
    >
      {icon}
      {label}
    </button>
  );
};
