"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Ellipsis } from "lucide-react";

const AppTableData = ({
  data = [],
  columns = [],
  heading,
  loading = false,
  onLoadMore,
  hasMore = false,
  onDelete,
  onEdit,
  page
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [orderBy, setOrderBy] = useState(columns[0]?.accessorKey || "");
  const [order, setOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openConfirmDialog = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (onDelete && toDeleteId) onDelete(toDeleteId);
    setConfirmOpen(false);
    setToDeleteId(null);
  };

  const handleEdit = (row) => {
    handleMenuClose();
    console.log(row)
    router.push(`${page}/form/edit/${row._id}`)
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 20 &&
        hasMore
      ) {
        onLoadMore?.();
      }
    };
    if (container) container.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [onLoadMore, hasMore]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sortedData.length) return;
      if (e.key === "ArrowDown") {
        setSelectedRowIndex((prev) =>
          Math.min((prev ?? -1) + 1, sortedData.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setSelectedRowIndex((prev) => Math.max((prev ?? 1) - 1, 0));
      } else if (e.key === "Enter" && selectedRowIndex !== null) {
        router.push(`/${page}/form/edit/${sortedData[selectedRowIndex]._id}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sortedData, selectedRowIndex]);

  if (!mounted) return null;

  if (!data.length && loading)
    return (
      <div className="flex items-center justify-center h-32">
        <CircularProgress />
      </div>
    );

  if (!data.length)
    return (
      <Typography sx={{ p: 2 }}>
        No data available.
      </Typography>
    );

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: isDark ? "#1E1E1E" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
    >
      {heading && (
        <h2
          className={`text-xl font-semibold mb-4 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {heading}
        </h2>
      )}

      <TableContainer
        ref={scrollContainerRef}
        sx={{
          maxHeight: "79vh",
          overflowY: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: isDark ? "#fff" : "#000",
                    fontWeight: "bold",
                    backgroundColor: isDark ? "#2A2A2A" : "#f5f5f5",
                    border: '0'
                  }}
                >
                  <TableSortLabel
                    active={orderBy === col.accessorKey}
                    direction={orderBy === col.accessorKey ? order : "asc"}
                    onClick={() => handleSort(col.accessorKey)}
                    sx={{
                      color: isDark ? "#fff" : "#000",
                      "&.Mui-active": { color: isDark ? "#fff" : "#000" },
                      "& .MuiTableSortLabel-icon": {
                        color: isDark ? "#fff" : "#000",
                      },
                    }}
                  >
                    {col.header}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell
                sx={{
                  color: isDark ? "#fff" : "#000",
                  fontWeight: "bold",
                  backgroundColor: isDark ? "#2A2A2A" : "#f5f5f5",
                  border: '0'
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow
                key={row._id || index}
                selected={index === selectedRowIndex}
                hover
              >
                {columns.map((col) => {
                  const value =
                    col.accessorKey === "index"
                      ? index + 1
                      : row[col.accessorKey];
                  return (
                    <TableCell
                      key={col.accessorKey}
                      align={
                        ["invoices"].includes(col.accessorKey)
                          ? "left"
                          : col.accessorKey === "avatar"
                          ? "center"
                          : "left"
                      }
                      sx={{
                        color: isDark ? "#fff" : "#000",
                        borderBottom: "1px solid",
                        borderColor: isDark ? "#333" : "#ddd",
                      }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
                <TableCell sx={{ borderColor: isDark ? "#333" : "#ddd" }}>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, index)}
                  >
                    <Ellipsis
                      className={isDark ? "text-white" : "text-black"}
                      size={18}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() =>
            handleEdit(sortedData[selectedRowIndex] || {})
          }
          sx={{ gap: 1 }}
        >
          <Edit2 size={16} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            openConfirmDialog(sortedData[selectedRowIndex]?._id)
          }
          sx={{ gap: 1, color: "red" }}
        >
          <Trash2 size={16} /> Delete
        </MenuItem>
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AppTableData;
