import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Moon, Settings, Sun, User2Icon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useUserGetQuery, useUserPutMutation } from "@/store/api/apiSlice";
import { showErrorToast } from "./AppToast";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const AppSetting = ({ setShowBox }) => {
  const { setTheme } = useTheme();
  const [userUpdate, { isLoading }] = useUserPutMutation();
  const User = useSelector((state) => state?.globalState?.User);
  const id = User?._id;
  const { data } = useUserGetQuery(id, { skip: !id });
  const [tabs, setTabs] = useState("General");
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setuserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setuserAddress] = useState("");
  

  useEffect(() => {
    if (!data) return;

    const { userName, userEmail, userAddress } = data?.data;

    setuserName(userName);
    setUserEmail(userEmail);
    setuserAddress(userAddress);
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      userName,
      userAddress,
    };

    try {
      const res = userUpdate({ data, id: User?._id });
      console.log(res?.data);
    } catch (error) {
      console.log(error);
      showErrorToast({
        heading: error?.data.message || "Something went wrong",
      });
    }

    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full h-3/4 mx-4 lg:mx-0 lg:w-2/4 lg:h-2/3 bg-zinc-900 rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full h-1/5 lg:w-1/3  lg:h-full bg-zinc-800 p-4 flex flex-col">
          <div className="flex justify-start">
            <button
              onClick={() => setShowBox(false)}
              className="p-1 cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-700 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2 mt-4 flex items-center justify-center lg:flex-col flex-row">
            <button
              onClick={() => setTabs("General")}
              className={`w-full flex items-center gap-2 ${
                tabs == "General" && "bg-zinc-700 text-white"
              }   px-3 py-2 rounded-lg hover:bg-zinc-600 transition`}
            >
              <Settings size={20} />
              <span>General</span>
            </button>
            <button
              onClick={() => setTabs("Account")}
              className={`w-full flex items-center gap-2 ${
                tabs == "Account" && "bg-zinc-700 text-white"
              }    hover:bg-zinc-700 px-3 py-2 rounded-lg transition`}
            >
              <User2Icon size={20} />
              <span>Account</span>
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {tabs == "General" && (
          <>
            <div className="flex-1  p-6 overflow-y-auto ">
              <h2 className="text-xl font-semibold  text-white mb-4">
                Settings
              </h2>
              <div className=" py-5 flex items-center justify-between border-t-2">
                <h1 className="text-white">Theme</h1>
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
          </>
        )}

        {tabs === "Account" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-6">
              Account Settings
            </h2>

            <div className=" w-full max-w-lg mx-auto ">
              {/* userName */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={userName}
                  disabled={!isEditing}
                  onChange={(e) => setuserName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none ${
                    isEditing
                      ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                      : "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* userEmail - always disabled */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="userEmail"
                  value={userEmail}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* userAddress */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Address
                </label>
                <textarea
                  value={userAddress}
                  disabled={!isEditing}
                  onChange={(e) => setuserAddress(e.target.value)}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg resize-none text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none ${
                    isEditing
                      ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                      : "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md"
                  >
                    {isLoading ? "Loading..." : "Update Profile"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md"
                    >
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSetting;
