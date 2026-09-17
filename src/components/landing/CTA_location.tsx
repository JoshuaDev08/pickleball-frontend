import { motion, type Variants } from "framer-motion";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const detailsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const detailVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const LocationCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-secondary px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-content/80">
            Find Us
          </div>

          <h2 className="mb-6 font-display text-3xl font-bold text-white">
            Visit Our Facilities
          </h2>

          <motion.div
            variants={detailsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5 text-sm text-white/65"
          >
            <motion.div variants={detailVariants} className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-content" />

              <div>
                <div className="font-semibold text-white">
                  PicklePro Sports Complex
                </div>
                <div>1240 Courts Avenue, Greenfield District</div>
                <div>San Francisco, CA 94102</div>
              </div>
            </motion.div>

            <motion.div variants={detailVariants} className="flex gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary-content" />

              <div>
                <div className="font-semibold text-white">Hours</div>
                <div>Monday – Friday: 6:00 AM – 11:00 PM</div>
                <div>Saturday – Sunday: 7:00 AM – 10:00 PM</div>
              </div>
            </motion.div>

            <motion.div variants={detailVariants} className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-content" />

              <div>
                <div className="font-semibold text-white">(415) 555-0180</div>

                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  hello@picklepro.com
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="rounded-2xl border border-primary/25 bg-primary/15 p-10 text-center shadow-lg"
        >
          <h3 className="mb-3 font-display text-2xl font-bold text-white">
            Ready to Play?
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-white/60">
            Create your free account and book your first court in under 2
            minutes.
          </p>

          <button
            className="btn btn-primary w-full border-0 py-3.5 text-base font-semibold text-white transition-transform"
            onClick={() => {
              navigate("/booking");
            }}
          >
            Book Your First Court
          </button>

          <button
            className="btn btn-outline mt-3 w-full border-white/15 bg-transparent text-sm font-semibold text-white/60 hover:border-white/25 hover:bg-white/5 hover:text-white"
            onClick={() => {
              navigate("/auth");
            }}
          >
            Sign In to Existing Account
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationCTA;
