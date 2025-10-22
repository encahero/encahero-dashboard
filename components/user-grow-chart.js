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
      // YYYY-MM-DD
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      key = `${yyyy}-${mm}-${dd}`;
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
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <CardTitle className="text-lg sm:text-xl font-semibold">
          User Growth
        </CardTitle>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Ngày</SelectItem>
            <SelectItem value="month">Tháng</SelectItem>
            <SelectItem value="year">Năm</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="w-full h-[250px] sm:h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={CustomTooltip} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
