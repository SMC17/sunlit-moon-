export const easeOut = [0.25, 0.1, 0.25, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};
