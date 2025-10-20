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
import formatDate from "@/utils/format-date";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-2 border rounded shadow text-sm 
                      bg-white dark:bg-gray-800 
                      text-black dark:text-white 
                      border-gray-200 dark:border-gray-700"
      >
        <p className="font-semibold">{label}</p>
        <p>Số lượng: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function getFilteredData(data, filterType) {
  const grouped = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    let key = "";

    if (filterType === "day") {
      key = formatDate(date);
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

  const formattedData = data.map((d) => ({
    date: new Date(d.date), // ✅ parse date
    count: Number(d.count), // ✅ convert to number
  }));

  const filteredData = getFilteredData(formattedData, filterType); // Hàm handle group

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
            <Tooltip content={CustomTooltip} />
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
