import { motion, type Variants } from "framer-motion";

type Payment = {
  id: string;
  booking: string;
  date: string;
  amount: number;
  method: "Card" | "GCash" | "Cash" | "Online";
  status: "paid" | "pending" | "refunded" | "failed";
};

const payments: Payment[] = [
  {
    id: "PAY-20260824-001",
    booking: "BK-20260824-001",
    date: "Aug 24, 2026",
    amount: 25,
    method: "GCash",
    status: "paid",
  },
  {
    id: "PAY-20260818-002",
    booking: "BK-20260818-002",
    date: "Aug 18, 2026",
    amount: 48,
    method: "Card",
    status: "paid",
  },
  {
    id: "PAY-20260810-003",
    booking: "BK-20260810-003",
    date: "Aug 10, 2026",
    amount: 25,
    method: "Online",
    status: "paid",
  },
  {
    id: "PAY-20260805-004",
    booking: "BK-20260805-004",
    date: "Aug 5, 2026",
    amount: 25,
    method: "GCash",
    status: "refunded",
  },
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

const statusStyles = {
  paid: "badge-success",
  pending: "badge-warning",
  refunded: "badge-info",
  failed: "badge-error",
};

const statusLabels = {
  paid: "Paid",
  pending: "Pending",
  refunded: "Refunded",
  failed: "Failed",
};

const PaymentHistoryPage = () => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="font-display text-2xl font-bold text-ink">
          Payment History
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          View your payment transactions and refund records.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="card overflow-hidden border border-base-200 bg-white shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="border-b border-base-200 bg-secondary">
                {[
                  "Payment ID",
                  "Booking",
                  "Date",
                  "Amount",
                  "Method",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-base-100 last:border-b-0 hover:bg-base-100"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-gray-400">
                    {payment.id}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-gray-400">
                    {payment.booking}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                    {payment.date}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-display font-bold text-ink">
                    ${payment.amount.toFixed(2)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-gray-500">
                    {payment.method}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`badge ${
                        statusStyles[payment.status]
                      } badge-outline whitespace-nowrap`}
                    >
                      {statusLabels[payment.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentHistoryPage;
