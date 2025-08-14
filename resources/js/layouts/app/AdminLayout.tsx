import React, { ReactNode } from "react";
import { Head } from "@inertiajs/react";
import AppSidebar from "@/components/AppSidebarAdmin";

interface Props {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: Props) {
  return (
    <>
      <Head title={title} />
      <div className="w-screen bg-gray-100">
        <div className="flex h-screen">
          <AppSidebar />
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </>
  );
}