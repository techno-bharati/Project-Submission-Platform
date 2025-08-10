import verifyAdmin from "@/actions/verifyAdmin";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  await verifyAdmin();

  return children;
};

export default AdminLayout;
