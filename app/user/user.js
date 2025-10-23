"use client";
import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import UserGrowChart from "@/components/user-grow-chart";
import UserTable from "@/components/user-table";
import { userService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";
import UserFilter from "@/components/user-filter";
import { useUsers } from "@/hooks/use-user";
import CardTablePagination from "@/components/table-pagination";

export default function UserPage() {
  const { showErrorToast } = useToast();

  const [filterValues, setFilterValues] = useState({
    searchValue: "",
    rowQuantity: 20,
  });

  const [page, setPage] = useState(1);

  const { data: userData = [], isLoading } = useUsers({
    ...filterValues,
    page,
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

  const handleChangeFilter = useMemo(
    () => (values) => {
      console.log(values);
      setFilterValues(values);
    },
    []
  );

  const totalUsers = usersGrowth?.totalUsers ?? 0;
  const chartData = usersGrowth?.data ?? [];

  const pageNext = useCallback(() => {
    setPage((p) => Math.min(userData.totalPages, p + 1));
  }, [userData?.totalPages]);

  const pagePrev = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

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
        <UserFilter onChange={handleChangeFilter} />
        <UserTable data={userData.data || []} isLoading={isLoading} />

        <CardTablePagination
          page={page}
          totalPages={userData.totalPages}
          startIdx={(page - 1) * (filterValues.rowQuantity || 20)}
          visibleLength={userData.data?.length || 0}
          totalCount={userData.total || 0}
          onPrev={pagePrev}
          onNext={pageNext}
        />
      </div>
    </div>
  );
}
