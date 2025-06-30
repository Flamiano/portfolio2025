"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Navbar } from "./components/Navbar";
import ParticlesBg from "./ParticlesBg";
import { Footer } from "./components/Footer";
import TrueFocus from "./components/truefocustext/TrueFocusText";
import EducationSection from "./pages/education/page";
import AboutMeSection from "./pages/about/page";
import TextCursor from "./components/text-cursor/TextCursor";
import ProjectSection from "./pages/projects/page";
import TechStackSection from "./pages/techstack/page";
import { ContactSection } from "./pages/contact/page";
import { OffersSection } from "./pages/offerings/page";
import Loader from "./components/loader/Loader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isLoaded && <Loader />}

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            key="main-content"
            className="relative min-h-screen font-poppins overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <ParticlesBg />

            <div className="absolute inset-0 z-50 pointer-events-none">
              <TextCursor
                text="roel"
                spacing={80}
                randomFloat={true}
                exitDuration={0.3}
                maxPoints={10}
              />
            </div>

            <div className="relative z-10">
              <Navbar />

              {/* HERO SECTION */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-[88%] mx-auto px-6 py-40"
                id="#home"
              >
                <motion.div
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:items-start items-center text-center md:text-left"
                >
                  <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                    <h1 className="text-4xl sm:text-[10rem] md:text-[5rem] lg:text-[12rem] font-extrabold text-[#5e17eb] leading-tight drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
                      Flamiano
                    </h1>
                    <div className="hidden md:flex flex-col items-center mb-[-1rem] lg:mb-[-3.7rem]">
                      <Link
                        href="/cv.pdf"
                        target="_blank"
                        download
                        className="bg-[#5e17eb] hover:bg-purple-800 text-white px-6 py-2 rounded-full shadow-md transition text-sm md:text-base"
                      >
                        Download CV
                      </Link>
                      <p className="text-gray-400 text-xs sm:text-sm mt-2">
                        Aspiring Software Engineer
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-[8rem] font-extrabold text-gray-800 text-center md:text-left drop-shadow-[1px_1px_1px_rgba(0,0,0,0.2)] mt-4"
                >
                  John Roel R.
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="mt-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 px-4 text-center md:text-left"
                >
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-md">
                    A passionate developer focused on full-stack web
                    technologies and building modern, scalable web applications.
                  </p>

                  <div className="hidden md:block text-gray-400 text-3xl">
                    |
                  </div>

                  <TrueFocus
                    sentence="Web Developer|Software Engineer|Web Designer"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#5e17eb"
                    glowColor="rgba(94, 23, 235, 0.6)"
                    animationDuration={1.2}
                    pauseBetweenAnimations={1}
                  />
                </motion.div>

                <div className="md:hidden flex flex-col items-center mt-8">
                  <Link
                    href="/cv.pdf"
                    target="_blank"
                    download
                    className="bg-[#5e17eb] hover:bg-purple-800 text-white px-6 py-2 rounded-full shadow-md transition text-sm"
                  >
                    Download CV
                  </Link>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2">
                    Aspiring Software Engineer
                  </p>
                </div>
              </motion.section>

              {/* MAIN SECTIONS */}
              <AboutMeSection />
              <EducationSection />
              <ProjectSection />
              <TechStackSection />
              <OffersSection />
              <ContactSection />
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
