import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import getImageUrl from "@/utils/get-image-url";
import formatDate from "@/utils/format-date";
import { Input } from "./ui/input";
import { useState } from "react";

function UserTable({ data }) {
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
    <Card>
      <CardHeader>
        <CardTitle>User List</CardTitle>
        <Input
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <Table noWrapper>
            <TableHeader className="bg-gray-100 dark:bg-stone-950 sticky top-0 z-10">
              <TableRow>
                <TableHead className="px-4 py-2">ID</TableHead>
                <TableHead className="px-4 py-2">Email</TableHead>
                <TableHead className="px-4 py-2">Username</TableHead>
                <TableHead className="px-4 py-2">Avatar</TableHead>
                <TableHead className="px-4 py-2">Full Name</TableHead>
                <TableHead className="px-4 py-2">Created At</TableHead>
                <TableHead className="px-4 py-2">Updated At</TableHead>
                <TableHead className="px-4 py-2">Time Zone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="px-4 py-2">{u.id}</TableCell>
                  <TableCell className="px-4 py-2">{u.email}</TableCell>
                  <TableCell className="px-4 py-2">{u.username}</TableCell>
                  <TableCell className="px-4 py-2">
                    <img
                      src={getImageUrl(u.avatar)}
                      className="w-8 h-8 rounded-full dark:bg-white border-1"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {((u.firstName || "") + " " + (u.lastName || "")).trim() ||
                      "NO NAME"}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {formatDate(u.created_at)}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {formatDate(u.updated_at)}
                  </TableCell>
                  <TableCell className="px-4 py-2">{u.time_zone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default UserTable;
