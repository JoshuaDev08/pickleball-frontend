import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Courts", href: "#courts" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
];

const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const logoVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Navbar = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "px-2 pt-2 sm:px-4" : "px-0 pt-0"
      }`}
    >
      <div
        className={`navbar relative overflow-hidden transition-all duration-500 ease-out ${
          isScrolled
            ? "rounded-2xl border border-white/25 bg-secondary/90 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xs"
            : "border border-transparent bg-secondary shadow-none"
        }`}
      >
        {/* Glass Highlight */}
        {isScrolled && (
          <>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 via-white/5 to-transparent" />

            <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-[70%] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
          </>
        )}

        {/* Logo */}
        <div className="navbar-start relative z-10">
          <motion.div
            className="flex cursor-pointer items-center gap-3"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            onClick={() => {
              navigate("/");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary"
              whileHover={{
                scale: 1.08,
                rotate: -3,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3C12 3 8.5 7.5 8.5 12s3.5 9 3.5 9" />
                <path d="M12 3C12 3 15.5 7.5 15.5 12s3.5 9 3.5 9" />
                <path d="M3 12h18" />
              </svg>
            </motion.div>

            <div>
              <div className="font-display text-lg font-bold text-white leading-none">
                PicklePro
              </div>

              <div className="mt-1 text-xs leading-none text-accent">
                Court Booking
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          className="navbar-center relative z-10 hidden md:flex"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={navItemVariants}
                className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.a>
            ))}
            <button
              className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
            >
              Check-In
            </button>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="navbar-end relative z-10 gap-3"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            variants={navItemVariants}
            className="btn btn-ghost btn-sm text-white/75 hover:bg-white/10 hover:text-white"
            onClick={() => {
              navigate("/auth");
            }}
          >
            Sign In
          </motion.button>

          <motion.button
            variants={navItemVariants}
            className="btn btn-primary btn-sm"
          >
            Book a Court
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
