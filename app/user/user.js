"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import UserGrowChart from "@/components/user-grow-chart";
import UserTable from "@/components/user-table";
import { userService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export default function UserPage() {
  const { showErrorToast } = useToast();
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
    queryFn: async () => {
      try {
        const res = await userService.getUsersGrowth();
        return res;
      } catch (err) {
        showErrorToast("Ops!", getErrorMessage(err));
        return [];
      }
    },
  });

  const totalUsers = usersGrowth?.totalUsers ?? 0;
  const chartData = usersGrowth?.data ?? [];

  return (
    <div className="h-full w-full">
      <div className="space-y-6 p-4 pb-32">
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
    </div>
  );
}
