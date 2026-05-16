"use client";

import { motion } from "framer-motion";

export default function NeonAnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[#05040f]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0920] via-[#05040f] to-black" />

      {/* moving orbs (continuous) */}
      <motion.div
        className="absolute -top-48 -left-48 h-[56rem] w-[56rem] rounded-full blur-3xl opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.45) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 140, 0], y: [0, 80, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 -right-56 h-[62rem] w-[62rem] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 72%)",
        }}
        animate={{ x: [0, -170, 0], y: [0, 110, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-26rem] left-1/4 h-[62rem] w-[62rem] rounded-full blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,148,0.40) 0%, transparent 72%)",
        }}
        animate={{ x: [0, 160, 0], y: [0, -120, 0], scale: [1, 1.22, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20rem] right-1/4 h-[54rem] w-[54rem] rounded-full blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(255,166,0,0.35) 0%, transparent 72%)",
        }}
        animate={{ x: [0, -120, 0], y: [0, -90, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* rotating ring */}
      <motion.div
        className="absolute left-1/2 top-56 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* shine sweeps */}
      <motion.div
        className="absolute -inset-x-60 top-28 h-44 rotate-6 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-2xl"
        animate={{ x: [-300, 1800] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-x-60 top-[520px] h-32 -rotate-6 bg-gradient-to-r from-transparent via-white/7 to-transparent blur-2xl"
        animate={{ x: [1800, -300] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* particles */}
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/20"
          style={{
            left: `${(i * 9 + 8) % 96}%`,
            top: `${(i * 13 + 14) % 92}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.12, 0.55, 0.12],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: 3.2 + (i % 6),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        />
      ))}

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />
    </div>
  );
}