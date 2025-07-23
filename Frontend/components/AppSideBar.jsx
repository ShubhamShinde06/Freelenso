"use client";

import React from "react";
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
  Plus,
  ScrollText,
  User2,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AppSidebar(props) {

   const pathname = usePathname();

  const data = [
    {
      label: "Clients",
      headOne: "All Clients",
      iconOne: <Users />,
      linkOne: "/client",
      headTwo: "Add New Client",
      iconTwo: <Plus />,
      linkTwo: "/client/form/create",
    },
    {
      label: "Projects",
      headOne: "All Projects",
      iconOne: <FileJson2 />,
      linkOne: "/project",
      headTwo: "Add New Project",
      iconTwo: <Plus />,
      linkTwo: "/project/form/create",
    },
    {
      label: "Invoices",
      headOne: "All Invoices",
      iconOne: <ScrollText />,
      linkOne: "/invoice",
      headTwo: "Add New Invoice",
      iconTwo: <Plus />,
      linkTwo: "/invoice/form/create",
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
                <SidebarMenuButton asChild className={`py-5 ${pathname === '/dashborad' && 'dark:bg-[#262626] dark:text-white border-2 bg-[#FFFFFF] text-black'}`}>
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
            <SidebarGroupLabel className={"text-[15px]"}>
              {item.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`py-4 ${pathname === item.linkOne  && 'dark:bg-[#262626] dark:text-white border-2 bg-[#FFFFFF] text-black'}`}>
                    <Link href={item.linkOne} className="flex gap-3 ">
                      <span className=" text-base rounded">{item.iconOne}</span>
                      <span className="">{item.headOne}</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarMenuButton asChild className={`py-4 mt-1 ${pathname === item.linkTwo  && 'dark:bg-[#262626] dark:text-white border-2 bg-[#FFFFFF] text-black'}`}>
                    <Link href={item.linkTwo} className="flex gap-3 ">
                      <span className=" text-base rounded">{item.iconTwo}</span>
                      <span className="">{item.headTwo}</span>
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
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> John Doe <ChevronUp className=" ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={"end"}>
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
