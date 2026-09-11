import { Outlet } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import AdminSidebar from "../components/layout/admin/AdminSidebar";
import AdminTopbar from "../components/layout/admin/AdminTopbar";

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-base-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <AdminTopbar />

        {/* Page Content */}
        <main className="min-h-0 flex-1 overflow-y-auto p-6">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-7xl"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
