"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ScrollVelocity from "@/app/components/scroll-velocity/ScrollVelocity";
import RotatingText from "@/app/components/rotatingtext/RotatingText";
import TextPressure from "@/app/components/text-pressure/TextPressure";

const items = Array.from({ length: 15 }, (_, i) => ({
  image: `/mypic/${i + 1}.jpg`,
}));

const beliefTexts = [
  "I believe technology should make life easier, not harder.",
  "It should be useful, easy to use, and built with care.",
  "Great design starts with empathy and ends with impact.",
  "Every line of code should serve a purpose and people.",
];

const thoughtTexts = [
  "The best tech starts with simple ideas.",
  "I build things that solve real problems and feel good to use.",
  "Consistency, clarity, and curiosity drive my work.",
  "Innovation isn’t just about new — it’s about better.",
];

const Typewriter = ({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pause = 1000,
}: {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, texts]);

  return <span className="text-[#5e17eb] font-medium">{displayText}</span>;
};

const velocity = 100;

export default function AboutMeSection() {
  const twoColumnsRef = useRef(null);
  const isInView = useInView(twoColumnsRef, { amount: 0.3, once: false });

  return (
    <main className="min-h-screen">
      <section className="w-full px-4 md:px-10 py-20 max-w-full mx-auto space-y-16 relative overflow-hidden">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 text-[#5e17eb] font-semibold text-sm uppercase tracking-wider">
            <span>ABOUT</span>
            <div className="flex-1 border-t border-[#5e17eb]/40" />
          </div>
        </motion.div>

        {/* TextPressure */}
        <div className="block md:hidden text-center mb-2">
          <p className="text-gray-500 text-sm">HOVER ME</p>
        </div>

        <motion.div
          className="relative w-full h-[200px] md:h-[300px] lg:h-[550px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <TextPressure
            text="Roel!"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#5e17eb"
            strokeColor="#ff0000"
            minFontSize={40}
          />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden"
        >
          <div className="flex gap-6 whitespace-nowrap animate-[scrollLeftLoop_60s_linear_infinite] w-max">
            {[...items, ...items, ...items].map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-52 h-52 rounded-2xl overflow-hidden shadow-md border-l-4 border-[#5e17eb] bg-white relative"
              >
                <Image
                  src={item.image}
                  alt={`Roel ${idx + 1}`}
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes scrollLeftLoop {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-33.3333%);
              }
            }
          `}</style>
        </motion.div>

        {/* Belief and Thoughts */}
        <div className="flex flex-col lg:flex-row gap-10">
          {[beliefTexts, thoughtTexts].map((texts, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="border-l-4 border-[#5e17eb] pl-4 md:pl-6 w-full md:w-1/2"
            >
              <h3 className="text-lg md:text-xl font-bold text-[#5e17eb] mb-2">
                {i === 0 ? "Belief" : "Thoughts"}
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                <Typewriter texts={texts} />
              </p>
            </motion.div>
          ))}
        </div>

        {/* ScrollVelocity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full flex justify-center"
        >
          <ScrollVelocity
            texts={[
              "Aspiring Web Developer",
              "Aspiring Software Engineer",
              "Aspiring Web Designer",
            ]}
            velocity={velocity}
            className="custom-scroll-text"
          />
        </motion.div>

        {/* Two Column Layout */}
        <div
          ref={twoColumnsRef}
          className="flex flex-col lg:flex-row gap-10 items-start w-full"
        >
          {/* Left */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-between"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 pt-4">
              <h2 className="font-poppins font-bold text-[#5e17eb] text-lg md:text-xl">
                This is Me
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-normal">
                I’m a passionate{" "}
                <span className="text-[#5e17eb] font-medium">BSIT student</span>{" "}
                who loves exploring the world of technology and creativity.
                <br />
                <br />
                When I was a kid, I dreamed of becoming a{" "}
                <span className="italic text-[#5e17eb]">civil engineer</span>. I
                used to draw buildings and bridges in my notebooks, always
                wondering how they were made.
                <br />
                <br />
                But everything changed in senior high school when I took the{" "}
                <span className="text-[#5e17eb] font-medium">
                  ICT Programming Strand
                </span>
                . That’s where I was truly introduced to the world of
                technology.
                <br />
                <br />
                Since then, I’ve been passionate about coding, UI/UX design, and
                system development. I believe technology is more than just
                machines — it’s a powerful tool to solve real-life problems and
                bring people together through meaningful digital experiences.
                <br />
                <br />
                Now, I continue to learn and improve every day, with a strong
                desire to build digital solutions that are innovative, useful,
                and creative.
              </p>
            </div>

            <div className="text-center mt-8 mb-4">
              <h2 className="font-poppins font-extrabold text-[1.5rem] md:text-[3rem] lg:text-[4rem] text-[#5e17eb] leading-tight">
                Creative{" "}
                <span className="relative inline-block align-middle">
                  <RotatingText
                    texts={[
                      "Coding",
                      "Thinking",
                      "Solutions",
                      "Interfaces",
                      "Exploration",
                      "Innovation",
                      "Strategy",
                    ]}
                    mainClassName="px-3 bg-[#5e17eb] text-white font-bold text-[1.5rem] md:text-[3rem] lg:text-[4rem] overflow-hidden justify-center rounded-lg font-poppins"
                    staggerFrom="last"
                    animate={{ y: 0 }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </span>
              </h2>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="w-full lg:w-1/2 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl overflow-hidden border-b-4 border-[#5e17eb]">
              <Image
                src="/mockups/portfolio.png"
                alt="Portfolio Mockup"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center">
              This portfolio was built to showcase my skills as a developer and
              designer.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
