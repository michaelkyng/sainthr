import { AnimatePresence, motion } from 'motion/react';

export default function MobileNav({ menuToggled }: { menuToggled: boolean }) {
  return (
    <>
      <AnimatePresence>
        {menuToggled && (
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-0 w-2/3 sm:w-1/2 bg-accent h-screen "
          >
            <p>Hi there</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
