import React from 'react'
import { Button } from './ui/button'
import { Grip, Plus } from 'lucide-react'

const AppNavBar = () => {
  return (
     <div className="dark:bg-[#171717] bg-[#FAFAFA] w-full p-2.5 rounded-lg flex items-center justify-between">
                <div className="w-1/3 border py-1.5 dark:bg-[#262626] bg-[#FFFFFF] rounded-md">
                    <input 
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent px-2 outline-0 border-0 w-full h-full dark:text-white dark:placeholder:text-white text-black placeholder:text-black" 
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button className="dark:bg-[#262626] dark:text-white border bg-[#FFFFFF] text-black cursor-pointer hover:bg-transparent">
                        <Grip />
                    </Button>
                    <Button className="dark:bg-[#262626] dark:text-white border bg-[#FFFFFF] text-black cursor-pointer hover:bg-transparent">
                       <span><Plus/></span> Add Client
                    </Button>
                </div>
            </div>
  )
}

export default AppNavBar