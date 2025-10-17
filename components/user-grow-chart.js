import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function getFilteredData(data, filterType) {
  const grouped = {};

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    let key = "";

    if (filterType === "day") {
      key = date.toISOString().split("T")[0]; // YYYY-MM-DD
    } else if (filterType === "month") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`; // YYYY-MM
    } else if (filterType === "year") {
      key = `${date.getFullYear()}`; // YYYY
    }

    if (!grouped[key]) grouped[key] = 0;
    grouped[key] += item.count;
  });

  return Object.entries(grouped).map(([label, count]) => ({ label, count }));
}

export default function UserGrowChart({ data }) {
  const [filterType, setFilterType] = useState("day");

  const filteredData = getFilteredData(data, filterType); // Hàm handle group

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>User Growth</CardTitle>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Ngày</SelectItem>
            <SelectItem value="month">Tháng</SelectItem>
            <SelectItem value="year">Năm</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
