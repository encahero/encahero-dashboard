"use client";

import { Button } from "@/components/ui/button";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import getImageUrl from "@/utils/get-image-url";
import formatDate from "@/utils/format-date";
import { Input } from "./ui/input";
import { CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";

export default function UserTable({ data, onEdit, onDelete }) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((u) => {
    const fullName = (
      (u.firstName || "") +
      " " +
      (u.lastName || "")
    ).toLowerCase();
    const username = (u.username || "").toLowerCase();
    const keyword = search.toLowerCase();

    return fullName.includes(keyword) || username.includes(keyword);
  });

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
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Updated At</th>
              <th className="px-4 py-2 text-left">Time Zone</th>
              <th className="px-4 py-2 text-left">Actions</th>
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
                    {`${u.firstName || ""} ${u.lastName || ""}`.trim() ||
                      "NO NAME"}
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
