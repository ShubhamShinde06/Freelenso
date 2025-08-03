"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Grip, Plus } from "lucide-react";

const AppNavBar = ({ setShowForm, searchTerm, setSearchTerm}) => {
  const [ShowBox, setShowBox] = useState(false);
   const boxRef = useRef(null);

    // Hide on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowBox(false);
      }
    };

    if (ShowBox) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ShowBox]);

  return (
    <div className="dark:bg-[#171717] bg-[#FAFAFA] w-full p-2.5 rounded-lg flex items-center justify-between">
      <div className="w-1/3 border py-1.5 dark:bg-[#262626] bg-[#FFFFFF] rounded-md">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent px-2 outline-0 border-0 w-full h-full dark:text-white dark:placeholder:text-white text-black placeholder:text-black"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => setShowBox((prev) => !prev)}
          className="dark:bg-[#262626] dark:text-white border bg-[#FFFFFF] text-black cursor-pointer hover:bg-transparent"
        >
          <Grip />
        </Button>
        {ShowBox && (
          <div
            ref={boxRef}
             className={`absolute w-[200px] min-h-[120px] rounded-2xl bg-[#262626] top-[140px] right-[160px]
              transition-all duration-300 ease-in-out shadow-lg text-white p-2 flex flex-col gap-2  justify-center 
              ${ShowBox ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <Button className="dark:bg-[#262626] dark:text-white border bg-[#FFFFFF] text-black cursor-pointer hover:bg-[#171717]">PDF</Button>
            <Button className="dark:bg-[#262626] dark:text-white border bg-[#FFFFFF] text-black cursor-pointer hover:bg-transparent">IMPORT EXCEL</Button>
            <Button className="dark:bg-[#262626] dark:text-white border bg-[#FFFFFF] text-black cursor-pointer hover:bg-transparent">EXPORT EXCEL</Button>
          </div>
        )}

        <Button onClick={()=>setShowForm(true)} className="dark:bg-[#262626] dark:text-white border bg-[#FFFFFF] text-black cursor-pointer hover:bg-transparent">
          <span>
            <Plus />
          </span>{" "}
          Add Client
        </Button>
      </div>
    </div>
  );
};

export default AppNavBar;
