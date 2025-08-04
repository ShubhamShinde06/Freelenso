"use client";

import AppNavBar from "@/components/AppNavBar";
import AppTableData from "@/components/AppTableData";
import ClientForm from "@/components/form/ClientForm";
import { useClientGetMutation } from "@/store/api/apiSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSocket } from "@/lib/socket";
import { Avatar } from "@mui/material";

export default function ClientPage() {
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const User = useSelector((state) => state?.globalState?.User);

  const [getClients, { isLoading, error }] = useClientGetMutation();

  const loadingRef = useRef(false);

  const fetchClients = useCallback(
    async (pageNum = 1) => {
      loadingRef.current = true;
      setLoadingMore(true);
      try {
        const response = await getClients({
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
    [getClients, searchTerm, User]
  );

  useEffect(() => {
    setPage(1);
    fetchClients(1);
  }, [searchTerm, fetchClients]);

  useEffect(() => {
    const socket = initSocket();

    socket.on("client:created", () => {
      fetchClients(1);
      setPage(1);
    });

    return () => {
      socket.off("client:created");
    };
  }, [fetchClients]);

  const loadMore = () => {
    if (loadingRef.current || loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchClients(nextPage);
  };

  const data = allData.map((client, index) => ({
    id: index + 1,
    _id: client._id,
    avatar: (
      <Avatar
        sx={{ width: 32, height: 32, fontSize: 14, background: "orange" }}
      >
        {client.firstName?.[0] ?? ""}
        {client.lastName?.[0] ?? ""}
      </Avatar>
    ),
    firstName: `${client.firstName} ${client.lastName}`,
    clientEmail: client.email,
    projects: 0, // Add dynamic count if needed later
    invoices: 0, // Add dynamic count if needed later
    status: "Active", // or derive from DB
  }));

  const columns = [
    { accessorKey: "id", header: "#" },
    { accessorKey: "avatar", header: "Avatar" },
    { accessorKey: "firstName", header: "Client Name" },
    { accessorKey: "clientEmail", header: "Email" },
    { accessorKey: "projects", header: "Projects" },
    { accessorKey: "invoices", header: "Invoices" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <div>
        <AppNavBar
          showForm={showForm}
          setShowForm={setShowForm}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div>
        <AppTableData
          data={data}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={isLoading && page === 1}
          loadingMore={loadingMore}
          columns={columns}
          page={'client'}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-2 lg:p-0">
          <ClientForm setShowForm={setShowForm} />
        </div>
      )}
    </div>
  );
}
