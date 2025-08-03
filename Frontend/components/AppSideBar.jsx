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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Atom,
  BanknoteArrowUp,
  ChevronUp,
  FileJson2,
  Home,
  LayoutDashboard,
  Moon,
  Plus,
  ScrollText,
  Settings,
  Sun,
  User,
  User2,
  User2Icon,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/global/globalState";
import axios from "axios";

export default function AppSidebar(props) {
  const pathname = usePathname();
  const [ShowBox, setShowBox] = useState(false);
  const { setTheme } = useTheme();
  const User = useSelector((state) => state?.globalState?.User);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      console.log("Logout response:", response.data);

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
    {
      label: "Reports",
      headOne: "Earnings Summary",
      iconOne: <BanknoteArrowUp />,
      linkOne: "",
      headTwo: "Client Summary",
      iconTwo: <Plus />,
      linkTwo: "",
    },
  ];

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="lg:mt-4 mt-1 text-orange-300 text-2xl"
              >
                <Link href="/" className="flex items-center gap-2">
                  {/* Logo Icon */}
                  <div className="">
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <defs>
                        <linearGradient
                          id="freelensoGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#3EC1F3" />
                          <stop offset="100%" stopColor="#7B3DED" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#freelensoGradient)"
                        fillRule="evenodd"
                        d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                        clipRule="evenodd"
                      />
                      <path
                        fill="url(#freelensoGradient)"
                        fillRule="evenodd"
                        d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.35 0 .687.06 1 .17V5a2 2 0 0 0-2-2H5Zm4 10H3v2a2 2 0 0 0 2 2h4v-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Logo Text/Name */}
                  <div className="relative w-[140px] h-[60px]">
                    <Image
                      src="/logo.png"
                      alt="Logo Text"
                      fill
                      priority
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 140px"
                    />
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className={" mt-2"}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`py-5 ${
                      pathname === "/dashborad" &&
                      "dark:bg-[#262626] dark:text-white border-2 bg-[#FFFFFF] text-black"
                    }`}
                  >
                    <Link href={"/dashborad"} className="flex gap-3 ">
                      <span className="  text-base rounded">
                        <LayoutDashboard />
                      </span>
                      <span className="">Dashborad</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {data.map((item, index) => (
            <SidebarGroup key={index + 1}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`py-4 ${
                        pathname === item.linkOne &&
                        "dark:bg-[#262626] dark:text-white border-2 bg-[#FFFFFF] text-black"
                      }`}
                    >
                      <Link href={item.linkOne} className="flex gap-3 ">
                        <span className=" text-base rounded">
                          {item.iconOne}
                        </span>
                        <span className="">{item.headOne}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className=" cursor-pointer">
                  <SidebarMenuButton>
                    <div className="w-8 h-8 border rounded-full relative overflow-hidden">
                      {User?.userPhoto ? (
                        <Image src={User.userPhoto} fill alt="user-photo" />
                      ) : (
                        <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-xs">
                          {User?.userName?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                    {User?.userName}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={"end"}>
                  <DropdownMenuItem>Account</DropdownMenuItem>
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
      {ShowBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full h-3/4 mx-4 lg:mx-0 lg:w-2/4 lg:h-2/3 bg-zinc-900 rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 h-1/3 lg:h-full bg-zinc-800 p-4 flex flex-col ">
              <div className="flex justify-start">
                <button
                  onClick={() => setShowBox(false)}
                  className="p-1 cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-700 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-2 mt-4">
                <button className="w-full flex items-center gap-2 bg-zinc-700 text-white px-3 py-2 rounded-lg hover:bg-zinc-600 transition">
                  <Settings size={20} />
                  <span>General</span>
                </button>
                <button className="w-full flex items-center gap-2 text-zinc-300 hover:text-white hover:bg-zinc-700 px-3 py-2 rounded-lg transition">
                  <User2Icon size={20} />
                  <span>Account</span>
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 dark:bg-zinc-950 bg-[#ffffff] p-6 overflow-y-auto ">
              <h2 className="text-xl font-semibold dark:text-white text-black mb-4">
                Settings
              </h2>
              <div className=" py-5 flex items-center justify-between border-t-2">
                <h1 className="text-black dark:text-white">Theme</h1>
                {/* THEME MENU */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem]  w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer" />
                      <span className="sr-only ">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setTheme("light")}
                      className={"cursor-pointer"}
                    >
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("dark")}
                      className={"cursor-pointer"}
                    >
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("system")}
                      className={"cursor-pointer"}
                    >
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
