import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Download, Search, Users, Eye } from "lucide-react";

type CustomerTier =
  | "Gold Member"
  | "Silver Member"
  | "Bronze Member"
  | "Member";

type Customer = {
  name: string;
  email: string;
  phone: string;
  joined: string;
  sessions: number;
  spent: number;
  status: CustomerTier;
};

const customers: Customer[] = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "(415) 555-0147",
    joined: "Jan 2024",
    sessions: 34,
    spent: 847,
    status: "Gold Member",
  },
  {
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    phone: "(415) 555-0156",
    joined: "Mar 2024",
    sessions: 28,
    spent: 620,
    status: "Silver Member",
  },
  {
    name: "Priya Patel",
    email: "priya.p@email.com",
    phone: "(415) 555-0162",
    joined: "Feb 2024",
    sessions: 22,
    spent: 480,
    status: "Silver Member",
  },
  {
    name: "James Liu",
    email: "james.l@email.com",
    phone: "(415) 555-0174",
    joined: "Apr 2024",
    sessions: 15,
    spent: 340,
    status: "Bronze Member",
  },
  {
    name: "Emma Thompson",
    email: "emma.t@email.com",
    phone: "(415) 555-0183",
    joined: "May 2024",
    sessions: 12,
    spent: 280,
    status: "Bronze Member",
  },
  {
    name: "David Okafor",
    email: "d.okafor@email.com",
    phone: "(415) 555-0191",
    joined: "Jun 2024",
    sessions: 8,
    spent: 180,
    status: "Member",
  },
  {
    name: "Lisa Kim",
    email: "lisa.k@email.com",
    phone: "(415) 555-0199",
    joined: "Jul 2024",
    sessions: 5,
    spent: 120,
    status: "Member",
  },
];

const tierStyles: Record<
  CustomerTier,
  {
    badge: string;
  }
> = {
  "Gold Member": {
    badge: "bg-amber-500/10 text-amber-600",
  },
  "Silver Member": {
    badge: "bg-gray-500/10 text-gray-500",
  },
  "Bronze Member": {
    badge: "bg-primary/10 text-primary",
  },
  Member: {
    badge: "bg-base-100 text-gray-500",
  },
};

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

function AdminCustomers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return customers;
    }

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />

            <h2 className="font-display text-xl font-bold text-ink">
              Customers
            </h2>
          </div>

          <p className="mt-0.5 text-sm text-gray-400">2,418 total members</p>
        </div>

        <button
          type="button"
          className="btn border-none bg-primary px-4 text-sm font-semibold text-white shadow-none hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </motion.div>

      {/* Customer Table */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-base-200 bg-white"
      >
        {/* Search */}
        <div className="border-b border-base-200 px-5 py-4">
          <label className="input flex w-full max-w-sm items-center gap-2 border-base-200 bg-base-100">
            <Search className="h-4 w-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="grow text-sm"
            />
          </label>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[950px] text-sm">
            <thead>
              <tr className="border-b border-base-200 bg-base-100">
                {[
                  "Customer",
                  "Phone",
                  "Joined",
                  "Sessions",
                  "Total Spent",
                  "Tier",
                  "",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => {
                const initials = customer.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("");

                const tier = tierStyles[customer.status];

                return (
                  <motion.tr
                    key={customer.email}
                    variants={rowVariants}
                    className="border-b border-base-100 last:border-none hover:bg-base-100/60"
                  >
                    {/* Customer */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                          {initials}
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-ink">
                            {customer.name}
                          </div>

                          <div className="mt-0.5 text-xs text-gray-400">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3">
                      <span className="font-mono-data text-xs text-gray-500">
                        {customer.phone}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">
                        {customer.joined}
                      </span>
                    </td>

                    {/* Sessions */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-ink">
                        {customer.sessions}
                      </span>
                    </td>

                    {/* Total Spent */}
                    <td className="px-4 py-3">
                      <span className="font-display text-sm font-bold text-primary">
                        ₱{customer.spent.toLocaleString()}
                      </span>
                    </td>

                    {/* Tier */}
                    <td className="px-4 py-3">
                      <span
                        className={[
                          "badge badge-sm border-none font-semibold",
                          tier.badge,
                        ].join(" ")}
                      >
                        {customer.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="btn btn-sm border border-base-200 bg-white px-3 text-xs font-medium text-gray-500 shadow-none hover:bg-base-100"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-100">
              <Users className="h-5 w-5 text-gray-400" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-ink">
              No customers found
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Try searching with a different name, email, or phone number.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default AdminCustomers;
