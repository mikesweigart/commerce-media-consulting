"use client";

/**
 * Thin "use client" wrappers around framer-motion primitives.
 * Import these instead of `motion` directly in server-component pages
 * (pages that export `metadata`) to avoid the RSC boundary error.
 */

import { motion, HTMLMotionProps } from "framer-motion";

export function MotionDiv({
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return <motion.div {...props}>{children}</motion.div>;
}

export function MotionLi({
  children,
  ...props
}: HTMLMotionProps<"li">) {
  return <motion.li {...props}>{children}</motion.li>;
}
