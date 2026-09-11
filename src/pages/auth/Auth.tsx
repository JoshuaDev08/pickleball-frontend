import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Clock3,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Trophy,
} from "lucide-react";

type AuthTab = "login" | "register";

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
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

const formVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
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

const featureContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const featureVariants: Variants = {
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

const Auth = () => {
  const [tab, setTab] = useState<AuthTab>("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 900);
  };

  const switchTab = (nextTab: AuthTab) => {
    setTab(nextTab);
  };

  const features = [
    {
      icon: <Clock3 className="h-4 w-4" />,
      text: "Book courts in under 60 seconds",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      text: "QR check-in — no waiting in line",
    },
    {
      icon: <Trophy className="h-4 w-4" />,
      text: "Full session history and stats",
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      text: "Secure and reliable booking",
    },
  ];

  return (
    <main className="min-h-screen bg-base-100">
      <div className="flex min-h-screen">
        <motion.section
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          className="hidden w-[480px] shrink-0 flex-col justify-between bg-secondary p-12 lg:flex"
        >
          <div>
            <Link
              to="/"
              className="mb-12 flex w-fit items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/85"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>

            <Link to="/" className="mb-12 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <div className="text-xl text-white">◉</div>
              </div>

              <div>
                <div className="font-display text-xl font-bold text-white">
                  PicklePro
                </div>

                <div className="text-xs text-white/40">
                  Court Booking Platform
                </div>
              </div>
            </Link>

            <h2 className="mb-4 font-display text-3xl font-bold text-white">
              Your game, perfectly managed.
            </h2>

            <p className="mb-10 text-sm leading-relaxed text-white/55">
              Join 2,400+ players who book courts, track sessions, and manage
              their pickleball experience through PicklePro.
            </p>

            <motion.div
              variants={featureContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.text}
                  variants={featureVariants}
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary-content">
                    {feature.icon}
                  </span>

                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="rounded-2xl border border-primary/25 bg-primary/15 p-5">
            <div className="mb-2 flex gap-0.5 text-warning">{"★★★★★"}</div>

            <p className="mb-3 text-sm leading-relaxed text-white/70">
              "The booking experience is flawless. I can reserve a court during
              my commute and check in with my phone when I arrive."
            </p>

            <div className="text-xs font-semibold text-white">
              Marcus J. — Active Member
            </div>
          </div>
        </motion.section>

        <section className="flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-10">
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm text-base-content/50 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>

              <Link to="/" className="font-display font-bold text-primary">
                PicklePro
              </Link>
            </div>

            <div className="mb-8 flex rounded-xl bg-base-200 p-1">
              <button
                type="button"
                onClick={() => switchTab("login")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  tab === "login"
                    ? "bg-white text-base-content shadow-sm"
                    : "text-base-content/40 hover:text-base-content/60"
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => switchTab("register")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  tab === "register"
                    ? "bg-white text-base-content shadow-sm"
                    : "text-base-content/40 hover:text-base-content/60"
                }`}
              >
                Create Account
              </button>
            </div>

            {tab === "login" ? (
              <>
                <div className="mb-7">
                  <h1 className="font-display text-2xl font-bold text-base-content">
                    Welcome back
                  </h1>

                  <p className="mt-1 text-sm text-base-content/45">
                    Sign in to manage your bookings and sessions.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="login-email"
                      className="mb-1.5 block text-sm font-medium text-base-content/80"
                    >
                      Email address
                    </label>

                    <label className="input input-bordered flex w-full items-center gap-2 bg-white">
                      <Mail className="h-4 w-4 text-base-content/35" />

                      <input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="grow"
                        required
                      />
                    </label>
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label
                        htmlFor="login-password"
                        className="text-sm font-medium text-base-content/80"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <label className="input input-bordered flex w-full items-center gap-2 bg-white">
                      <LockKeyhole className="h-4 w-4 text-base-content/35" />

                      <input
                        id="login-password"
                        type="password"
                        value={loginPassword}
                        onChange={(event) =>
                          setLoginPassword(event.target.value)
                        }
                        placeholder="Enter your password"
                        className="grow"
                        required
                      />
                    </label>
                  </div>

                  <label className="flex cursor-pointer items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                    />

                    <span className="text-sm text-base-content/55">
                      Remember me for 30 days
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary mt-2 w-full border-0 text-white"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-base-200" />

                  <span className="text-xs text-base-content/35">
                    or continue with
                  </span>

                  <div className="h-px flex-1 bg-base-200" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="btn btn-outline border-base-200 bg-white text-base-content hover:border-primary hover:bg-primary/5"
                  >
                    Google
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline border-base-200 bg-white text-base-content hover:border-primary hover:bg-primary/5"
                  >
                    Apple
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-7">
                  <h1 className="font-display text-2xl font-bold text-base-content">
                    Create your account
                  </h1>

                  <p className="mt-1 text-sm text-base-content/45">
                    Join thousands of players on PicklePro. Free to sign up.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="mb-1.5 block text-sm font-medium text-base-content/80"
                      >
                        First name
                      </label>

                      <input
                        id="first-name"
                        type="text"
                        placeholder="Alex"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className="input input-bordered w-full bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="last-name"
                        className="mb-1.5 block text-sm font-medium text-base-content/80"
                      >
                        Last name
                      </label>

                      <input
                        id="last-name"
                        type="text"
                        placeholder="Johnson"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className="input input-bordered w-full bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="register-email"
                      className="mb-1.5 block text-sm font-medium text-base-content/80"
                    >
                      Email address
                    </label>

                    <label className="input input-bordered flex w-full items-center gap-2 bg-white">
                      <Mail className="h-4 w-4 text-base-content/35" />

                      <input
                        id="register-email"
                        type="email"
                        placeholder="alex@email.com"
                        value={registerEmail}
                        onChange={(event) =>
                          setRegisterEmail(event.target.value)
                        }
                        className="grow"
                        required
                      />
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="register-phone"
                      className="mb-1.5 block text-sm font-medium text-base-content/80"
                    >
                      Phone number
                    </label>

                    <label className="input input-bordered flex w-full items-center gap-2 bg-white">
                      <Phone className="h-4 w-4 text-base-content/35" />

                      <input
                        id="register-phone"
                        type="tel"
                        placeholder="+1 (415) 555-0100"
                        value={registerPhone}
                        onChange={(event) =>
                          setRegisterPhone(event.target.value)
                        }
                        className="grow"
                        required
                      />
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="register-password"
                      className="mb-1.5 block text-sm font-medium text-base-content/80"
                    >
                      Password
                    </label>

                    <label className="input input-bordered flex w-full items-center gap-2 bg-white">
                      <LockKeyhole className="h-4 w-4 text-base-content/35" />

                      <input
                        id="register-password"
                        type="password"
                        placeholder="Min. 8 characters"
                        value={registerPassword}
                        onChange={(event) =>
                          setRegisterPassword(event.target.value)
                        }
                        className="grow"
                        minLength={8}
                        required
                      />
                    </label>
                  </div>

                  <label className="flex items-start gap-2.5 py-1">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary mt-0.5"
                      required
                    />

                    <span className="text-xs leading-relaxed text-base-content/55">
                      I agree to PicklePro's{" "}
                      <button
                        type="button"
                        className="font-medium text-primary hover:underline"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="font-medium text-primary hover:underline"
                      >
                        Privacy Policy
                      </button>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary mt-2 w-full border-0 text-white"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              </>
            )}

            <p className="mt-6 text-center text-xs text-base-content/45">
              {tab === "login"
                ? "Don't have an account? "
                : "Already have an account? "}

              <button
                type="button"
                onClick={() =>
                  switchTab(tab === "login" ? "register" : "login")
                }
                className="font-semibold text-primary hover:underline"
              >
                {tab === "login" ? "Sign up free" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
