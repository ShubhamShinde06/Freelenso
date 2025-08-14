"use client";

import { usePathname, useSearchParams } from "next/navigation";
import AppSideBar from "@/components/AppSideBar";
import AppHeader from "@/components/AppHeader";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/global/globalState";
import { initSocket } from "@/lib/socket";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hiddenPaths = ["/auth", "/"];
  const isReadonly = searchParams?.get("view") === "readonly";
  //const hideLayout = hiddenPaths.includes(pathname);
  const hideLayout = hiddenPaths.includes(pathname) ||   (isReadonly);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanyInfo = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
          withCredentials: true,
        })
        .then((res) => {
          const userData = {
            userEmail: res.data.user.userEmail,
            userName: res.data.user.userName,
            userPhoto: res.data.user.userPhoto,
            _id: res.data.user._id,
          };
          dispatch(setUser(userData));
        })
        .catch((error) => {
          console.log("Not logged in", error);
        });
    };

    fetchCompanyInfo();

    const socket = initSocket();

    socket.on("user:sign", () => {
      fetchCompanyInfo(); 
    });

    return () => {
      socket.off("user:sign");
    };

  }, [dispatch]);

  return (
    <>
      {!hideLayout && <AppSideBar />}
      <main className="flex-1 w-full h-screen overflow-hidden">
        <div
          className={` ${
            !hideLayout && "lg:mt-4 lg:mr-2 p-2 m-1 rounded-lg"
          }  dark:bg-[#0a0a0a]  flex flex-col  h-full shadow-inner print:m-0 print:p-0`}
        >
          {!hideLayout && (
            <div className="sticky top-0 z-20 dark:bg-[#0a0a0a] backdrop-blur-md border-white/10 py-1 px-1 print:p-0 print:bg-white">
              <AppHeader />
            </div>
          )}

          <div
            className={`flex-1 overflow-auto custom-scroll ${
              !hideLayout && "px-1 py-4 print:p-0"
            }   `}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
