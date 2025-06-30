"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Travel Booking Website",
    description:
      "A responsive and dynamic travel booking website. This platform allows users to explore popular destinations, book appointment or inquire flights, and view travel information. Includes admin dashboard functionalities for managing bookings, users, appointments.",
    image: "/projects/travel.png",
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "PHP Mailer"],
    github: "https://github.com/Flamiano/adventours.git",
    live: "https://adventourstravelinc.com/",
  },
  {
    title: "Anniversary Website",
    description:
      "A surprise website with a timeline, custom animations, gallery, and personalized messages — built to celebrate a memorable relationship milestone.",
    image: "/projects/anniversary.png",
    tech: ["React.js", "Tailwind", "Node.js"],
    github: "https://github.com/Flamiano/annivproj.git",
    live: "https://annivproj.vercel.app/",
  },
  {
    title: "PikTà - Digital PhotoBooth",
    description:
      "A web-based photobooth system for events. Users can take photos, apply filters, and print or download instantly. Designed with a festive, real-time experience in mind.",
    image: "/projects/pikta.png",
    tech: ["Next.js", "Tailwind", "Node.js"],
    github: "https://github.com/Flamiano/pikta.git",
    live: "https://pikta.vercel.app/",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, animated personal website built with Next.js, Tailwind, Framer Motion, and GSAP — featuring a smooth user interface, project previews, and animated sections.",
    image: "/mockups/portfolio.png",
    tech: ["Next.js", "Node.js", "Tailwind", "GSAP", "Framer Motion"],
    github: "https://github.com/Flamiano/portfolio.git",
    live: "https://johnroelflamiano2025.vercel.app/",
  },
];

export default function ProjectSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inViewStates, setInViewStates] = useState(
    Array(projects.length).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInViewStates((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 md:px-10 py-30 max-w-7xl lg:max-w-full mx-auto"
      id="projects"
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 text-[#5e17eb] font-semibold text-sm uppercase tracking-wider">
          <span>PROJECTS</span>
          <div className="flex-1 border-t border-[#5e17eb]/40" />
        </div>
      </motion.div>

      {/* Project Rows */}
      <div className="space-y-20">
        {projects.map((project, index) => {
          const isInView = inViewStates[index];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className={`flex flex-col lg:flex-row ${
                isEven ? "" : "lg:flex-row-reverse"
              } items-center gap-10`}
            >
              {/* Image Mockup */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[420px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl border-2 border-[#5e17eb]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-[#5e17eb]">
                  {project.title}
                </h3>
                <p className="text-gray-700 text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#5e17eb] text-white px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#5e17eb] text-white text-sm font-medium rounded-md hover:bg-[#4b0fce] transition"
                  >
                    Visit GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-200 text-sm font-medium rounded-md hover:bg-gray-300 transition"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
