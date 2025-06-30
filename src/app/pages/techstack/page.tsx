"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiMysql,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiGithub,
  SiCanva,
} from "react-icons/si";
import { FaCoffee } from "react-icons/fa";
import { Wrench, Code, Paintbrush, Database } from "lucide-react";

const techStack = {
  frontend: [
    {
      name: "HTML5",
      icon: <SiHtml5 className="text-orange-500 text-4xl md:text-5xl" />,
    },
    {
      name: "CSS3",
      icon: <SiCss3 className="text-blue-500 text-4xl md:text-5xl" />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-300 text-4xl md:text-5xl" />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-600 text-4xl md:text-5xl" />,
    },
    {
      name: "React",
      icon: <SiReact className="text-cyan-400 text-4xl md:text-5xl" />,
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-gray-900 text-4xl md:text-5xl" />,
    },
    {
      name: "TailwindCSS",
      icon: <SiTailwindcss className="text-teal-400 text-4xl md:text-5xl" />,
    },
    {
      name: "Bootstrap",
      icon: <SiBootstrap className="text-purple-500 text-4xl md:text-5xl" />,
    },
  ],
  backend: [
    {
      name: "PHP",
      icon: <SiPhp className="text-indigo-400 text-4xl md:text-5xl" />,
    },
    {
      name: "Java",
      icon: <FaCoffee className="text-orange-600 text-4xl md:text-5xl" />,
    },
    {
      name: "MySQL",
      icon: <SiMysql className="text-sky-600 text-4xl md:text-5xl" />,
    },
    {
      name: "Firebase",
      icon: <SiFirebase className="text-yellow-400 text-4xl md:text-5xl" />,
    },
    {
      name: "Supabase",
      icon: <SiSupabase className="text-green-500 text-4xl md:text-5xl" />,
    },
  ],
  other: [
    {
      name: "Git",
      icon: <SiGit className="text-red-500 text-4xl md:text-5xl" />,
    },
    {
      name: "GitHub",
      icon: <SiGithub className="text-gray-900 text-4xl md:text-5xl" />,
    },
    {
      name: "Canva",
      icon: <SiCanva className="text-cyan-500 text-4xl md:text-5xl" />,
    },
    {
      name: "CapCut",
      icon: <Wrench className="text-gray-900 text-4xl md:text-5xl" />,
    },
  ],
};

const allIcons = [
  ...techStack.frontend,
  ...techStack.backend,
  ...techStack.other,
];

export default function TechStackSection() {
  return (
    <section
      className="w-full px-4 md:px-10 py-24 mx-auto"
      id="techstack"
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 text-[#5e17eb] font-semibold text-sm uppercase tracking-wider">
          <span>TECH STACK</span>
          <div className="flex-1 border-t border-[#5e17eb]/40" />
        </div>
      </motion.div>

      {/* Frontend Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 border border-[#5e17eb] rounded-lg p-6 text-gray-900"
      >
        <div className="flex items-center gap-2 mb-4 text-[#5e17eb] font-semibold text-lg">
          <Paintbrush size={24} />
          <h3>Frontend</h3>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.frontend.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 hover:text-[#5e17eb] transition"
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Backend & Other Tools */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Backend */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-[#5e17eb] rounded-lg p-6 text-gray-900"
        >
          <div className="flex items-center gap-2 mb-4 text-orange-400 font-semibold text-lg">
            <Database size={24} />
            <h3>Backend</h3>
          </div>
          <ul className="space-y-3">
            {techStack.backend.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 hover:text-[#5e17eb] transition"
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Other Tools */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="border border-[#5e17eb] rounded-lg p-6 text-gray-900"
        >
          <div className="flex items-center gap-2 mb-4 text-green-400 font-semibold text-lg">
            <Code size={24} />
            <h3>Other Tools</h3>
          </div>
          <ul className="space-y-3">
            {techStack.other.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 hover:text-[#5e17eb] transition"
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Auto Scroll Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h3 className="text-xl md:text-2xl font-bold text-[#5e17eb] mb-8">
          Visual Stack Preview
        </h3>

        <div className="relative overflow-hidden w-full">
          <div className="carousel-track flex gap-10">
            {[...allIcons, ...allIcons].map((item, index) => (
              <div
                key={index}
                className="min-w-[5rem] min-h-[5rem] flex items-center justify-center text-5xl hover:scale-110 transition-transform duration-300"
                title={item.name}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .carousel-track {
            animation: scrollLeft 40s linear infinite;
            will-change: transform;
          }

          @keyframes scrollLeft {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @media (max-width: 768px) {
            .carousel-track {
              animation-duration: 20s;
            }
          }
        `}</style>
      </motion.div>
    </section>
  );
}
