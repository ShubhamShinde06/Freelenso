"use client";
import React from "react";
import ClientContent from "@/components/ClientContent";
import withSuspense from "@/components/withSuspense";

function ClientPage() {


  return (
    <div>
      <ClientContent/>
    </div>
  );
}

export default withSuspense(ClientPage);
