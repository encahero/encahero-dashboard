"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import UserGrowChart from "@/components/user-grow-chart";
import UserTable from "@/components/user-table";
import { userService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function UserPage() {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAllUsers(),
  });

  const { data: usersGrowth = [] } = useQuery({
    queryKey: ["users-growth"],
    queryFn: () => userService.getUsersGrowth(),
  });

  const totalUsers = usersGrowth?.totalUsers ?? 0;
  const chartData = usersGrowth?.data ?? [];

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
