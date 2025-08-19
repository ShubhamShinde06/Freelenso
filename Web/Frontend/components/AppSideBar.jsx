"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  BanknoteArrowUp,
  ChevronUp,
  FileJson2,
  LayoutDashboard,
  Plus,
  ScrollText,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/global/globalState";
import axios from "axios";
import AppSetting from "./AppSetting";

export default function AppSidebar(props) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const User = useSelector((state) => state?.globalState?.User);
  const dispatch = useDispatch();
  const router = useRouter();
  const [ShowBox, setShowBox] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

     // console.log("Logout response:", response.data);

      // Optional: check if success is true
      if (response.data.success) {
        dispatch(setUser(null));
        router.push("/auth");
      } else {
        console.warn("Logout failed on server:", response.data.message);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const data = [
    {
      label: "Clients",
      headOne: "All Clients",
      iconOne: <Users />,
      linkOne: "/client",
    },
    {
      label: "Projects",
      headOne: "All Projects",
      iconOne: <FileJson2 />,
      linkOne: "/project",
    },
    {
      label: "Invoices",
      headOne: "All Invoices",
      iconOne: <ScrollText />,
      linkOne: "/invoice",
    },
  ];

  return (
    <>
     <Sidebar collapsible="icon" {...props} className="print:hidden">
  {/* Header */}
  <SidebarHeader className="h-20">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="mt-1 h-18 text-2xl">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-violet-600 flex items-center justify-center text-white font-bold">
              F
            </div>
            {/* This will auto-hide in icon mode */}
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Freelenso</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Develop By DevSyntra
              </div>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>

  {/* Menu */}
  <SidebarContent className="mt-2">
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={`py-4 ${
                pathname === "/dashboard"
                  ? "dark:bg-[#262626] text-white border-2 bg-white"
                  : ""
              }`}
            >
              <Link href="/dashboard" className="flex gap-3 items-center">
                <LayoutDashboard className="w-5 h-5" />
                <span className="inline">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    {/* Dynamic Items */}
    {data.map((item, index) => (
      <SidebarGroup key={index}>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`py-4 ${
                  pathname === item.linkOne
                    ? "dark:bg-[#262626] text-white border-2 bg-white"
                    : ""
                }`}
              >
                <Link
                  href={item.linkOne}
                  onClick={() =>
                    window.innerWidth < 1024 && toggleSidebar()
                  }
                  className="flex gap-3 items-center"
                >
                  <span className="w-5 h-5">{item.iconOne}</span>
                  <span className="inline">{item.headOne}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ))}
  </SidebarContent>

  {/* Footer */}
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <SidebarMenuButton>
              <div className="w-8 h-8 border rounded-full relative overflow-hidden">
                {User?.userPhoto ? (
                  <Image
                    src={User.userPhoto}
                    fill
                    alt="user-photo"
                    sizes="32px"
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-xs">
                    {User?.userName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <span className="inline">{User?.userName}</span>
              <ChevronUp className="ml-auto inline" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setShowBox(true)}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>


      {/* Modal Overlay */}
      {ShowBox && <AppSetting setShowBox={setShowBox} />}
    </>
  );
}
