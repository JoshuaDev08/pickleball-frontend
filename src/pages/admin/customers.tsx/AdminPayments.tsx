import { motion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  CreditCard,
  PhilippinePeso,
} from "lucide-react";

type PaymentStatus = "paid" | "pending" | "overdue";

type Payment = {
  id: string;
  booking: string;
  customer: string;
  date: string;
  amount: number;
  method: string;
  status: PaymentStatus;
};

const payments: Payment[] = [
  {
    id: "PAY-4425",
    booking: "BK-2847",
    customer: "Sarah Chen",
    date: "Aug 27",
    amount: 32.84,
    method: "Visa ••4242",
    status: "paid",
  },
  {
    id: "PAY-4424",
    booking: "BK-2846",
    customer: "Mike Rodriguez",
    date: "Aug 27",
    amount: 87.36,
    method: "Apple Pay",
    status: "paid",
  },
  {
    id: "PAY-4423",
    booking: "BK-2845",
    customer: "Emma Thompson",
    date: "Aug 27",
    amount: 43.84,
    method: "Mastercard ••9871",
    status: "pending",
  },
  {
    id: "PAY-4422",
    booking: "BK-2843",
    customer: "Priya Patel",
    date: "Aug 27",
    amount: 23.24,
    method: "Visa ••7741",
    status: "pending",
  },
  {
    id: "PAY-4420",
    booking: "BK-2839",
    customer: "Lisa Kim",
    date: "Aug 27",
    amount: 46.6,
    method: "Google Pay",
    status: "paid",
  },
  {
    id: "PAY-4418",
    booking: "BK-2835",
    customer: "Robert Walsh",
    date: "Aug 26",
    amount: 29.05,
    method: "Visa ••4242",
    status: "overdue",
  },
];

const statusConfig: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
    icon: typeof CheckCircle2;
  }
> = {
  paid: {
    label: "Paid",
    className: "bg-primary/10 text-primary",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-600",
    icon: Clock3,
  },
  overdue: {
    label: "Overdue",
    className: "bg-orange-500/10 text-orange-600",
    icon: AlertTriangle,
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

type StatCardProps = {
  label: string;
  value: string;
  sub: string;
  icon: typeof PhilippinePeso;
  iconClassName: string;
  valueClassName?: string;
};

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconClassName,
  valueClassName = "text-ink",
}: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-2xl border border-base-200 bg-white p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {label}
          </p>

          <p
            className={[
              "mt-2 font-display text-2xl font-bold",
              valueClassName,
            ].join(" ")}
          >
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-400">{sub}</p>
        </div>

        <div
          className={[
            "flex h-10 w-10 items-center justify-center rounded-xl",
            iconClassName,
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function AdminPayments() {
  const collected = payments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pending = payments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const overdue = payments
    .filter((payment) => payment.status === "overdue")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingCount = payments.filter(
    (payment) => payment.status === "pending"
  ).length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />

          <h2 className="font-display text-xl font-bold text-ink">Payments</h2>
        </div>

        <p className="mt-0.5 text-sm text-gray-400">
          Monitor payments, pending invoices, and overdue charges
        </p>
      </motion.div>

      {/* Payment Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Collected Today"
          value={`₱${collected.toFixed(2)}`}
          sub="3 transactions"
          icon={PhilippinePeso}
          iconClassName="bg-primary/10 text-primary"
          valueClassName="text-primary"
        />

        <StatCard
          label="Pending"
          value={`₱${pending.toFixed(2)}`}
          sub={`${pendingCount} invoices`}
          icon={Clock3}
          iconClassName="bg-amber-500/10 text-amber-600"
          valueClassName="text-amber-600"
        />

        <StatCard
          label="Overdue"
          value={`₱${overdue.toFixed(2)}`}
          sub="1 invoice past due"
          icon={AlertTriangle}
          iconClassName="bg-orange-500/10 text-orange-600"
          valueClassName="text-orange-600"
        />
      </div>

      {/* Payments Table */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-base-200 bg-white"
      >
        <div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-ink">Recent Payments</h3>

            <p className="mt-0.5 text-xs text-gray-400">
              Latest payment activity
            </p>
          </div>

          <span className="badge badge-sm border-none bg-base-100 text-gray-500">
            {payments.length} Transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full min-w-[950px] text-sm">
            <thead>
              <tr className="border-b border-base-200 bg-base-100">
                {[
                  "Payment ID",
                  "Booking",
                  "Customer",
                  "Date",
                  "Amount",
                  "Method",
                  "Status",
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
              {payments.map((payment) => {
                const config = statusConfig[payment.status];
                const StatusIcon = config.icon;

                return (
                  <motion.tr
                    key={payment.id}
                    variants={rowVariants}
                    className="border-b border-base-100 last:border-none hover:bg-base-100/60"
                  >
                    {/* Payment ID */}
                    <td className="px-4 py-3">
                      <span className="font-mono-data text-xs text-gray-400">
                        {payment.id}
                      </span>
                    </td>

                    {/* Booking */}
                    <td className="px-4 py-3">
                      <span className="font-mono-data text-xs font-medium text-primary">
                        {payment.booking}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-ink">
                        {payment.customer}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">
                        {payment.date}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3">
                      <span className="font-display text-sm font-bold text-ink">
                        ₱{payment.amount.toFixed(2)}
                      </span>
                    </td>

                    {/* Method */}
                    <td className="px-4 py-3">
                      <span className="font-mono-data text-xs text-gray-500">
                        {payment.method}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={[
                          "badge badge-sm gap-1 border-none font-semibold",
                          config.className,
                        ].join(" ")}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3">
                      {payment.status !== "paid" && (
                        <button
                          type="button"
                          className="btn btn-sm border-none bg-primary px-3 text-xs font-semibold text-white shadow-none hover:bg-primary/90"
                        >
                          Charge
                        </button>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminPayments;
