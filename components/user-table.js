"use client";

import { Button } from "@/components/ui/button";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import getImageUrl from "@/utils/get-image-url";
import formatDate from "@/utils/format-date";
import { Input } from "./ui/input";
import { useMemo, useState } from "react";
import { headerTextClassName } from "@/constants";

export default function UserTable({ data, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Đổi chiều nếu cùng cột
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Tính toán danh sách hiển thị (lọc + sắp xếp)
  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    const filtered = data.filter((u) => {
      const fullName = (
        (u.firstName || "") +
        " " +
        (u.lastName || "")
      ).toLowerCase();
      const username = (u.username || "").toLowerCase();
      return fullName.includes(keyword) || username.includes(keyword);
    });

    // sort
    const { key, direction } = sortConfig;
    return [...filtered].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      if (key === "created_at" || key === "updated_at") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, search, sortConfig]);

  return (
    <div className="space-y-4">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold tracking-wide">
          User List
        </h2>
        <Input
          placeholder="Search by name or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded bg-[var(--sidebar)] h-[70vh] w-full">
        <table className="w-full min-w-[1000px] table-auto border-collapse">
          <thead className="sticky top-0 bg-gray-100 dark:bg-stone-950 z-2">
            <tr>
              <th className={headerTextClassName}>ID</th>
              <th className={headerTextClassName}>Email</th>
              <th className={headerTextClassName}>Username</th>
              <th className={headerTextClassName}>Avatar</th>
              <th className={headerTextClassName}>Full Name</th>
              {/* Sortable column */}
              <th
                className={`${headerTextClassName} cursor-pointer select-none`}
                onClick={() => handleSort("created_at")}
              >
                Created At{" "}
                {sortConfig.key === "created_at"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th className={headerTextClassName}>Updated At</th>
              <th className={headerTextClassName}>Time Zone</th>
              <th className={headerTextClassName}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((u, index) => (
                <tr
                  key={`${u.id}-${index}`}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-2">{u.id}</td>
                  <td className="px-4 py-2 break-all">{u.email}</td>
                  <td className="px-4 py-2">{u.username}</td>
                  <td className="px-4 py-2">
                    <img
                      src={getImageUrl(u.avatar)}
                      alt={u.username}
                      className="w-8 h-8 rounded-full border dark:bg-white"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {`${u.firstName || ""} ${u.lastName || ""}`.trim() || "-"}
                  </td>
                  <td className="px-4 py-2">{formatDate(u.created_at)}</td>
                  <td className="px-4 py-2">{formatDate(u.updated_at)}</td>
                  <td className="px-4 py-2">{u.time_zone}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(u)}
                    >
                      <PenLineIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete?.(u.id)}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
