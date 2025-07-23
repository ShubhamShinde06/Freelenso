"use client";

import { ReduxProvider } from "@/store/provider";
import AppLayout from "./AppLayout";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function ClientLayout({ children }) {
  return (
    <>
      <ReduxProvider>
        <SidebarProvider>
          <AppLayout>{children}</AppLayout>
        </SidebarProvider>
      </ReduxProvider>
    </>
  );
}
