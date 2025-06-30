"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface Props {
  isMuted: boolean;
  toggleMute: () => void;
}

export const SoundTogglePortal = ({ isMuted, toggleMute }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={toggleMute}
      className="fixed bottom-3 right-3 text-xs text-gray-500 md:hidden z-[9999] cursor-pointer select-none"
    >
      SOUND [ {isMuted ? "OFF" : "ON"} ]
    </motion.div>,
    document.body
  );
};
