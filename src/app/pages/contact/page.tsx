"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation,
  Facebook,
  Github,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import Magnet from "@/app/components/magnet-buttons/Magnet";
import Image from "next/image";

export const ContactSection = () => {
  const [coords, setCoords] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [magnetActive, setMagnetActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords(`[ ${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E ]`);
      },
      () => {
        setCoords("[ Location Denied ]");
      }
    );

    const offset = new Date().getTimezoneOffset();
    const hours = Math.abs(offset / 60);
    const sign = offset > 0 ? "-" : "+";
    setTimezone(`[ GMT${sign}${String(hours).padStart(2, "0")}:00 ]`);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Manila",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="w-full h-screen flex flex-col items-center justify-between px-6 lg:px-16 py-20 bg-transparent relative overflow-hidden"
    >
      {/* Animated Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10 w-full px-4 mx-auto"
      >
        <div className="flex items-center gap-4 text-[#5e17eb] font-semibold text-sm uppercase tracking-wider">
          <span>CONTACT</span>
          <div className="flex-1 border-t border-[#5e17eb]/40" />
        </div>
      </motion.div>

      {/* Top Location Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm font-medium tracking-wide text-center uppercase"
      >
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 justify-center items-center text-[#5e17eb]/90">
          <div>
            <span className="text-dark/50">APOLONIO SAMSON</span>{" "}
            <span className="text-dark">{coords ?? "[ Locating... ]"}</span>
          </div>
          <div>
            <span className="text-dark/50">PH</span>{" "}
            <span className="text-dark">{timezone ?? "[ Loading... ]"}</span>
          </div>
        </div>
      </motion.div>

      {/* Central Message */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`text-[clamp(2.5rem,10vw,8rem)] font-extrabold text-center transition-colors duration-500 ${
          magnetActive
            ? "text-gray-500"
            : "bg-gradient-to-br from-gray-600 to-[#5e17eb] text-transparent bg-clip-text"
        }`}
      >
        LET'S BUILD IT
      </motion.h1>

      {/* Magnet Button */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <Magnet
          padding={300}
          disabled={showModal}
          magnetStrength={2}
          onActiveChange={setMagnetActive}
        >
          <div
            onClick={() => setShowModal(true)}
            className="relative flex items-center justify-center cursor-pointer"
          >
            <div className="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] rounded-full bg-[#5e17eb] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
              <Navigation size={60} className="text-white" />
            </div>
          </div>
        </Magnet>
      </motion.div>

      {/* Slide-in Modal with AnimatePresence */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 p-6 sm:p-8 flex flex-col justify-between"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                setMagnetActive(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="absolute top-4 left-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded"
                priority
              />
            </div>

            <div className="mt-16 sm:mt-24 md:mt-18 lg:mt-22 space-y-4 text-center text-gray-800 overflow-hidden">
              {/* Name and Header Info */}
              <div className="text-xl sm:text-2xl font-bold text-[#5e17eb] tracking-wide">
                John Roel Flamiano
              </div>
              <div className="text-xs sm:text-sm text-gray-600 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <span>Quezon City, PH</span>
                <span>{currentTime}, Asia/Manila</span>
              </div>

              {/* Inspiring Text */}
              <p className="text-sm sm:text-base leading-relaxed mt-4 text-gray-700">
                I’m genuinely excited to hear from you — whether you have an
                idea, a project, or just want to connect.
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Every great collaboration starts with a simple conversation.
                Let’s build something meaningful together. Your message could be
                the start of a truly creative journey.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 italic mt-2">
                Thank you for visiting — I appreciate your time!
              </p>

              {/* Contact Info */}
              <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs sm:text-sm font-medium text-gray-800 border-t pt-4 border-gray-200">
                <div className="flex items-center gap-2">
                  <Mail className="text-[#5e17eb]" size={18} />
                  <span>johnroelf17@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-[#5e17eb]" size={18} />
                  <span>+63 994 595 3073</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <div className="text-xs sm:text-sm font-semibold uppercase text-gray-600 mb-2">
                  Socials
                </div>
                <div className="flex gap-4 justify-center">
                  <a
                    href="https://web.facebook.com/roel.flamiano.2025/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5e17eb] hover:scale-110 transition"
                  >
                    <Facebook size={26} />
                  </a>
                  <a
                    href="https://github.com/Flamiano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5e17eb] hover:scale-110 transition"
                  >
                    <Github size={26} />
                  </a>
                  <a
                    href="https://www.instagram.com/r0w.ell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5e17eb] hover:scale-110 transition"
                  >
                    <Instagram size={26} />
                  </a>
                </div>
              </div>

              {/* CTA Text */}
              <h1 className="text-[#5e17eb] font-extrabold text-[2rem] sm:text-[3rem] mt-6 lg:mt-15">
                MESSAGE NOW!
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
