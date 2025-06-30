"use client";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import CountUp from "../count-up/CountUp";

export default function Loader() {
  const [showLoader, setShowLoader] = useState(true);

  const progressMotion = useMotionValue(0);
  const spring = useSpring(progressMotion, { damping: 20, stiffness: 100 });
  const width = useTransform(spring, (v) => `${v}%`);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      if (count <= 100) {
        progressMotion.set(count);
      }
      if (count >= 100) {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [progressMotion]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-white z-[9999] flex flex-col items-center justify-center"
        >
          {/* Progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-1 bg-[#5e17eb]"
            style={{ width }}
          />

          {/* Logo and synced CountUp */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="Loading..."
              className="mx-auto mb-4"
            />
            <CountUp
              from={0}
              to={100}
              duration={2.5}
              direction="up"
              separator=""
              className="text-sm text-gray-600"
              externalMotionValue={progressMotion}
              onEnd={() => {
                setTimeout(() => setShowLoader(false), 300); // wait 300ms after done
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
