"use client";

import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import CardList from "./CardList";
import PyChart from "./PyChart";
import GrapChart from "./GrapChart";
import InfoCards from "./InfoCards";
import {
  useClientsGetCountQuery,
  useInvoiceGetCountQuery,
  useInvoiceGetInfoQuery,
  useProjectGetInfoQuery,
  useProjectsGetCountQuery,
} from "@/store/api/apiSlice";
import { useSelector } from "react-redux";

const DashBorad = () => {
  const User = useSelector((state) => state?.globalState?.User);
  const userId = User?._id;

  const { data: clientTotal, isLoading: clientLod } = useClientsGetCountQuery(userId, {
    skip: !userId,
  });
  const { data: projectTotal, isLoading: projectLod } = useProjectsGetCountQuery(userId, {
    skip: !userId,
  });
  const { data: invoiceTotal, isLoading: invoiceLod } = useInvoiceGetCountQuery(userId, {
    skip: !userId,
  });

  const { data: invoiceData, isLoading: invoiceDataLod } = useInvoiceGetInfoQuery(userId, {
    skip: !userId,
  });
  const { data: projectData, isLoading: projectDataLod } = useProjectGetInfoQuery(userId, {
    skip: !userId,
  })

  const TolClient = clientTotal?.total;
  const TolProject = projectTotal?.total;
  const TolInvoice = invoiceTotal?.total;

  const [data, setData] = useState({
    clients: [],
    invoices: [],
    projects: [],
    loading: true,
  });


  const latestTransactions = invoiceData?.data
  ?.slice()
  ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  ?.slice(0, 5)
  ?.map(inv => ({
    name: inv.INV,
    detail: inv.status,
    value: inv.grandTotal,
  }));

  const latestProjects = projectData?.data
  ?.slice()
  ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  ?.slice(0, 5)
  ?.map(pro => ({
    name: pro.projectName,
    detail: pro.projectStatus,
    value: pro.budget,
  }));

    useEffect(() => {
    if (!invoiceData || !projectData) return;

    setData({
      clients: [],
      invoices: latestTransactions,
      projects: latestProjects,
      loading: false,
    });
  }, [invoiceData, projectData]);

   if (data.loading || invoiceDataLod || projectDataLod || invoiceLod || projectLod || clientLod) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  

 
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="flex  items-center   lg:col-span-4">
        <InfoCards
          TolClient={TolClient}
          TolProject={TolProject}
          TolInvoice={TolInvoice}
        />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">
        <BarChart data={invoiceData?.data}/>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <CardList title={"Latest Transactions"}  data={data.invoices}/>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <PyChart data={projectData?.data}/>
      </div>
      {/* <div className="bg-primary-foreground p-4 rounded-lg ">Test</div> */}
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3">
        <GrapChart data={invoiceData?.data}/>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <CardList title={"Latest Projects"} data={data.projects}/>
      </div>
    </div>
  );
};

export default DashBorad;
