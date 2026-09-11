import { Camera } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const profileFields = [
  { label: "First Name", value: "Sarah" },
  { label: "Last Name", value: "Chen" },
  { label: "Email", value: "sarah.chen@email.com", type: "email" },
  { label: "Phone", value: "+1 (415) 555-0147", type: "tel" },
  { label: "Location", value: "San Francisco, CA" },
  { label: "Skill Level", value: "Intermediate (3.5)" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

const ProfilePage = () => {
  return (
    <motion.div
      className="max-w-2xl space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="font-display text-2xl font-bold text-ink">My Profile</h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and membership details.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="card border border-base-200 bg-white shadow-sm"
      >
        <div className="card-body p-6">
          <div className="mb-6 flex items-center gap-5 border-b border-base-200 pb-6">
            <div className="avatar placeholder">
              <div className="w-16 rounded-full bg-primary text-2xl font-bold text-white">
                <span>SC</span>
              </div>
            </div>

            <div>
              <div className="font-display text-xl font-bold text-ink">
                Sarah Chen
              </div>

              <div className="text-sm text-gray-400">
                Active Member · Since January 2024
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="badge badge-warning badge-outline font-semibold">
                  Gold Member
                </span>

                <span className="text-xs text-gray-400">1,240 pts</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-ghost btn-sm ml-auto gap-2 rounded-lg text-primary"
            >
              <Camera className="h-4 w-4" />
              Edit Photo
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profileFields.map((field) => (
              <label key={field.label} className="form-control">
                <span className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {field.label}
                </span>

                <input
                  type={field.type ?? "text"}
                  defaultValue={field.value}
                  className="input input-bordered w-full rounded-xl border-base-200 bg-white text-sm text-ink outline-none focus:border-primary focus:outline-none"
                />
              </label>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <button
          type="button"
          className="btn btn-primary rounded-xl px-6 text-sm font-semibold text-white"
        >
          Save Changes
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
