"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import myPhoto from "/public/education/me.jpeg";
import PixelTransition from "@/app/components/pixel-transition/PixelTransition";

const educationData = [
  {
    year: "2023 - Present",
    level: "College",
    school: "Bestlink College of the Philippines",
    course: "Bachelor of Science in Information Technology",
    logo: "/education/Bestlink.png",
    awards: [
      "🎖️ Dean&apos;s Lister (1st Year)",
      "🏅 President&apos;s Lister (2nd Year)",
    ],
    isPresent: true,
  },
  {
    year: "2021 - 2023",
    level: "Senior High School",
    school: "Gardner College, Diliman Q.C.",
    course: "ICT Programming",
    logo: "/education/Gardner.png",
    awards: ["With High Honors", "🥇 Top 1 in Class", "Best in Programming"],
  },
  {
    year: "2017 - 2021",
    level: "Junior High School",
    school: "Masambong High School",
    logo: "/education/Masambong.png",
    awards: ["🎖️ With Honor"],
  },
  {
    year: "2011 - 2017",
    level: "Elementary School",
    school: "Apolonio Samson Elementary School",
    logo: "/education/Apolonio.png",
    awards: [],
  },
];

export default function EducationSection() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const storyRef = useRef(null);
  const isInView = useInView(storyRef, { amount: 0.3, once: false });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inViewStates, setInViewStates] = useState(
    Array(educationData.length).fill(false)
  );

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, educationData.length);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    }
  }, []);

  return (
    <section
      className="w-full px-4 md:px-10 py-30 max-w-7xl lg:max-w-full mx-auto"
      id="education"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 text-[#5e17eb] font-semibold text-sm uppercase tracking-wider">
          <span>EDUCATION</span>
          <div className="flex-1 border-t border-[#5e17eb]/40" />
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center max-w-[700px] lg:max-w-full mx-auto">
        {educationData.map((item, index) => {
          const isCardInView = inViewStates[index];

          return (
            <div
              key={index}
              className="flex justify-center w-full md:w-auto"
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={
                  isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
                }
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="relative"
              >
                {item.isPresent && (
                  <div className="absolute top-2 left-2 bg-[#5e17eb] text-white text-xs px-2 py-1 rounded z-20 font-semibold shadow-md">
                    Present
                  </div>
                )}

                {!isTouchDevice && (
                  <div className="absolute top-2 right-2 text-xs text-gray-500 font-semibold z-20">
                    Hover Me
                  </div>
                )}

                <div
                  onClick={() => {
                    if (isTouchDevice) {
                      setActiveIndex(index === activeIndex ? null : index);
                    }
                  }}
                  className={`${isTouchDevice ? "cursor-pointer" : ""}`}
                >
                  <PixelTransition
                    firstContent={
                      <div className="bg-white w-[300px] h-[300px] flex items-center justify-center p-4 rounded-lg border-l-4 border-[#5e17eb]">
                        <div className="relative w-[180px] h-[180px]">
                          <Image
                            src={item.logo}
                            alt={`${item.school} Logo`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 180px"
                          />
                        </div>
                      </div>
                    }
                    secondContent={
                      <div className="w-[300px] h-[300px] flex flex-col justify-center items-center border-l-4 border-black bg-[#5e17eb] text-white p-4 rounded-lg text-center overflow-y-auto">
                        <p className="text-lg font-bold text-[13px]">
                          {item.school}
                        </p>
                        <p className="text-[10px] mb-5">{item.course}</p>
                        <p className="text-sm">{item.year}</p>
                        {item.awards.length > 0 && (
                          <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-left">
                            {item.awards.map((award, i) => (
                              <li
                                key={i}
                                dangerouslySetInnerHTML={{ __html: award }}
                              />
                            ))}
                          </ul>
                        )}
                      </div>
                    }
                    gridSize={12}
                    pixelColor="#ffffff"
                    animationStepDuration={0.4}
                    className="rounded-lg overflow-hidden shadow-xl border border-[#5e17eb] hover:border-white transition-all duration-300"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto mt-16 px-4" ref={storyRef}>
        <motion.h2
          className="text-2xl font-bold text-[#5e17eb] mb-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          My Story
        </motion.h2>

        <div className="flex flex-col md:flex-col lg:flex-row items-center lg:items-start gap-10">
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={myPhoto}
                alt="Roel's Picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 flex items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-gray-700 text-justify">
              <p className="mb-4">
                From my early years at Apolonio Samson Elementary School to my
                current college life at Bestlink College of the Philippines,
                every step of my educational journey has shaped me into the
                programmer I am becoming...
              </p>
              <p className="mb-4">
                In junior and senior high school, my passion for programming
                grew stronger. I gained experience in languages like Visual
                Basic, Java, and PHP, and I loved every moment of solving
                logical problems and building mini-projects. Achieving honors
                and awards was just a bonus to the joy of learning and
                discovering.
              </p>
              <p className="mb-4">
                College has pushed me to grow even more — from working on group
                projects to exploring real-world coding practices. It taught me
                discipline, collaboration, and creativity.
              </p>
              <p>
                Today, as an IT college student, I&apos;m diving deep into
                software development, web design, and database systems. Each
                project, lesson, and challenge is preparing me for the real
                world. My goal is not just to become a skilled developer but
                also to create solutions that improve lives and make an impact
                through technology.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
