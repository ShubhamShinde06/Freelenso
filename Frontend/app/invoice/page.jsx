"use client";

import AppNavBar from "@/components/AppNavBar";
import AppTableData from "@/components/AppTableData";
import { useCallback, useEffect, useRef, useState } from "react";
import InvoiceForm from "@/components/form/InvoiceForm";
import { useSelector } from "react-redux";
import { useInvoiceGetMutation } from "@/store/api/apiSlice";
import { initSocket } from "@/lib/socket";
import { Avatar } from "@mui/material";

export default function InvoicePage() {
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const User = useSelector((state) => state?.globalState?.User);

  const [getInvoice, { isLoading, error }] = useInvoiceGetMutation();

  const loadingRef = useRef(false);

  const fetchInvoice = useCallback(
    async (pageNum = 1) => {
      loadingRef.current = true;
      setLoadingMore(true);
      try {
        const response = await getInvoice({
          page: pageNum,
          limit: 20,
          searchTerm: searchTerm,
          userId: User._id,
        }).unwrap();

        if (response?.data && Array.isArray(response.data)) {
          const fetchedClients = response.data;

          if (pageNum === 1) {
            setAllData(fetchedClients);
          } else {
            setAllData((prev) => [...prev, ...fetchedClients]);
          }

          setHasMore(fetchedClients.length === 20);
        }
      } catch (e) {
        // handle error if needed
      } finally {
        setLoadingMore(false);
        loadingRef.current = false;
      }
    },
    [getInvoice, searchTerm, User]
  );

  useEffect(() => {
    setPage(1);
    fetchInvoice(1);
  }, [searchTerm, fetchInvoice]);

  useEffect(() => {
    const socket = initSocket();

    socket.on("invoice:created", () => {
      fetchInvoice(1);
      setPage(1);
    });

    return () => {
      socket.off("invoice:created");
    };
  }, [fetchInvoice]);

  const loadMore = () => {
    if (loadingRef.current || loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchInvoice(nextPage);
  };
  console.log(allData);
  const data = allData.map((invoice, index) => ({
    id: index + 1,
    _id: invoice._id,
    INV: invoice.INV,
    DueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().slice(0, 10) : "",
    fullName: `${invoice.client.firstName} ${invoice.client.lastName}`,
    invoices: invoice.grandTotal, // Add dynamic count if needed later
    status: invoice.status, // or derive from DB
  }));

  const columns = [
    { accessorKey: "id", header: "#" },
    { accessorKey: "INV", header: "Invoice" },
    { accessorKey: "fullName", header: "Client Name" },
    { accessorKey: "DueDate", header: "Due Date"},
    { accessorKey: "invoices", header: "Invoices Amount" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div>
        <AppNavBar showForm={showForm} setShowForm={setShowForm} />
      </div>
      <div>
        <AppTableData
          data={data}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={isLoading && page === 1}
          loadingMore={loadingMore}
          columns={columns}
          page={"invoice"}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-2 lg:p-0">
          <InvoiceForm setShowForm={setShowForm} />
        </div>
      )}
    </div>
  );
}
