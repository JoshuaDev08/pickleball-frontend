import { motion, type Variants } from "framer-motion";

const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Footer = () => {
  const footerLinks = ["Privacy", "Terms", "Contact"];

  return (
    <footer className="w-full bg-[#0F2218] px-6 py-8 text-sm text-white/30">
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row"
      >
        <div className="font-display font-bold text-white/50">PicklePro</div>

        <div className="text-center">
          © 2026 PicklePro Court Management. All rights reserved.
        </div>

        <div className="flex gap-4">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="cursor-pointer transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
