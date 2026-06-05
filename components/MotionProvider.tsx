"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app so every framer-motion animation respects the user's
 * "prefers-reduced-motion" OS setting. Entrance/transform animations are
 * reduced to opacity-only (or skipped) for users who opt out of motion.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
