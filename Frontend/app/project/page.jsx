"use client";

import AppNavBar from "@/components/AppNavBar";
import AppTableData from "@/components/AppTableData";
import CreateProjectForm from "@/components/form/ProjectForm";
import { initSocket } from "@/lib/socket";
import { useProjectGetMutation } from "@/store/api/apiSlice";
import { Avatar } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function ProjectPage() {
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const User = useSelector((state) => state?.globalState?.User);

  const [getProjects, { isLoading, error }] = useProjectGetMutation();

  const loadingRef = useRef(false);

  const fetchProjects = useCallback(
    async (pageNum = 1) => {
      loadingRef.current = true;
      setLoadingMore(true);
      try {
        const response = await getProjects({
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
    [getProjects, searchTerm, User]
  );

  useEffect(() => {
    setPage(1);
    fetchProjects(1);
  }, [searchTerm, fetchProjects]);

  useEffect(() => {
    const socket = initSocket();

    socket.on("project:created", () => {
      fetchProjects(1);
      setPage(1);
    });

    return () => {
      socket.off("project:created");
    };
  }, [fetchProjects]);

  const loadMore = () => {
    if (loadingRef.current || loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProjects(nextPage);
  };



  const data = allData?.map((p, index) => ({
    id: index + 1,
    _id: p._id,
    clientName: `${p.client.firstName} ${p.client.lastName}`,
    projectName: p.projectName,
    startDate: p.startDate
      ? new Date(p.startDate).toISOString().slice(0, 10)
      : "",
    endDate: p.endDate ? new Date(p.endDate).toISOString().slice(0, 10) : "",
    budget: p.budget,
    projectStatus: p.projectStatus,
  }));

  const columns = [
    { accessorKey: "id", header: "#" },
    { accessorKey: "clientName", header: "Client Name" },
    { accessorKey: "projectName", header: "Project Name" },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    { accessorKey: "budget", header: "Budget" },
    { accessorKey: "projectStatus", header: "Status" },
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
          page={'project'}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-2 lg:p-0">
          <CreateProjectForm setShowForm={setShowForm} />
        </div>
      )}
    </div>
  );
}
