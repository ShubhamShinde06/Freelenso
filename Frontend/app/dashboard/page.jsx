"use client";


import { Suspense } from "react";
import DashBorad from "@/components/dashborad/DashBorad";

export default function DashboradPage(){

    return(
        <Suspense fallback={<div>Loading dashboard...</div>}>
<DashBorad/>
        </Suspense>
         
        
    )
}