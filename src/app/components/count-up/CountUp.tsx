"use client";
import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
  externalMotionValue?: MotionValue<number>; // <- Add this
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
  externalMotionValue,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const internalMotionValue = useMotionValue(direction === "down" ? to : from);
  const motionValue = externalMotionValue || internalMotionValue; // use external if given

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === "down" ? to : from);
    }
  }, [from, to, direction]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (onStart) onStart();

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const endTimeoutId = setTimeout(() => {
        if (onEnd) onEnd();
      }, delay * 1000 + duration * 1000);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(endTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const options = {
          useGrouping: !!separator,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        };

        const formatted = Intl.NumberFormat("en-US", options).format(
          Number(latest.toFixed(0))
        );

        ref.current.textContent = separator
          ? formatted.replace(/,/g, separator)
          : formatted;
      }
    });

    return () => unsubscribe();
  }, [springValue, separator]);

  return <span className={className} ref={ref} />;
}
