"use client";

import { usePathname } from "next/navigation";
import AppSideBar from "@/components/AppSideBar";
import AppHeader from "@/components/AppHeader";
import { useEffect } from "react";
import { useUserVerifyQuery } from "@/store/api/apiSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/global/globalState";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const hiddenPaths = ["/auth"];
  const hideLayout = hiddenPaths.includes(pathname);
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
  }, []);

  return (
    <>
      {!hideLayout && <AppSideBar />}
      <main className="flex-1 w-full h-screen overflow-hidden">
        <div
          className={` ${
            !hideLayout && "lg:mt-4 lg:mr-2 p-2 m-1 rounded-lg"
          }  dark:bg-[#0a0a0a]  flex flex-col  h-full shadow-inner`}
        >
          {!hideLayout && (
            <div className="sticky top-0 z-20 dark:bg-[#0a0a0a] backdrop-blur-md border-white/10 py-1 px-1">
              <AppHeader />
            </div>
          )}

          <div
            className={`flex-1 overflow-auto custom-scroll ${
              !hideLayout && "px-1 py-4"
            }   `}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
