"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import UserGrowChart from "@/components/user-grow-chart";
import UserTable from "@/components/user-table";

export default function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      {
        id: 1,
        email: "a@gmail.com",
        username: "a",
        avatar: "",
        firstName: "A",
        lastName: "Nguyen",
        created_at: "2024-01-01",
        updated_at: "2024-02-01",
        time_zone: "Asia/Seoul",
      },
      {
        id: 2,
        email: "b@gmail.com",
        username: "b",
        avatar: "",
        firstName: "B",
        lastName: "Tran",
        created_at: "2024-01-05",
        updated_at: "2024-02-02",
        time_zone: "Asia/Seoul",
      },
      {
        id: 3,
        email: "c@gmail.com",
        username: "c",
        avatar: "",
        firstName: "C",
        lastName: "Le",
        created_at: "2024-01-10",
        updated_at: "2024-02-05",
        time_zone: "Asia/Seoul",
      },
      {
        id: 4,
        email: "d@gmail.com",
        username: "d",
        avatar: "",
        firstName: "D",
        lastName: "Pham",
        created_at: "2024-01-12",
        updated_at: "2024-02-10",
        time_zone: "Asia/Seoul",
      },
      {
        id: 5,
        email: "e@gmail.com",
        username: "e",
        avatar: "",
        firstName: "E",
        lastName: "Hoang",
        created_at: "2024-02-01",
        updated_at: "2024-03-01",
        time_zone: "Asia/Seoul",
      },
      {
        id: 6,
        email: "f@gmail.com",
        username: "f",
        avatar: "",
        firstName: "F",
        lastName: "Nguyen",
        created_at: "2024-02-10",
        updated_at: "2024-03-05",
        time_zone: "Asia/Seoul",
      },
      {
        id: 7,
        email: "g@gmail.com",
        username: "g",
        avatar: "",
        firstName: "G",
        lastName: "Tran",
        created_at: "2024-03-01",
        updated_at: "2024-03-15",
        time_zone: "Asia/Seoul",
      },
      {
        id: 8,
        email: "h@gmail.com",
        username: "h",
        avatar: "",
        firstName: "H",
        lastName: "Le",
        created_at: "2024-03-10",
        updated_at: "2024-03-20",
        time_zone: "Asia/Seoul",
      },
      {
        id: 9,
        email: "g@gmail.com",
        username: "g",
        avatar: "",
        firstName: "G",
        lastName: "Tran",
        created_at: "2024-03-01",
        updated_at: "2024-03-15",
        time_zone: "Asia/Seoul",
      },
      {
        id: 10,
        email: "h@gmail.com",
        username: "h",
        avatar: "",
        firstName: "H",
        lastName: "Le",
        created_at: "2024-03-10",
        updated_at: "2024-03-20",
        time_zone: "Asia/Seoul",
      },
    ]);
  }, []);

  const totalUsers = users.length;

  const chartData = [
    { createdAt: "2024-01-12", count: 2 },
    { createdAt: "2024-01-13", count: 5 },
    { createdAt: "2024-01-14", count: 8 },
    { createdAt: "2024-01-15", count: 4 },
    { createdAt: "2024-01-16", count: 7 },
    { createdAt: "2024-02-12", count: 1 },
    { createdAt: "2024-02-13", count: 3 },
    { createdAt: "2024-02-14", count: 2 },
    { createdAt: "2024-03-12", count: 6 },
    { createdAt: "2024-03-13", count: 2 },
    { createdAt: "2024-04-12", count: 3 },
    { createdAt: "2024-04-14", count: 5 },
    { createdAt: "2025-01-10", count: 4 },
    { createdAt: "2025-02-12", count: 3 },
    { createdAt: "2025-03-05", count: 7 },
    { createdAt: "2025-04-12", count: 5 },
    { createdAt: "2025-04-14", count: 3 },
    { createdAt: "2025-05-01", count: 6 },
    { createdAt: "2025-06-10", count: 2 },
    { createdAt: "2025-06-15", count: 4 },
  ];

  return (
    <ScrollArea className="h-full w-full">
      <div className="space-y-6 pb-32 p-12">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
        <UserGrowChart data={chartData} />
        <UserTable data={users} />
      </div>
    </ScrollArea>
  );
}
