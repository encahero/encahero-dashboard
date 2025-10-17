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

function UserTable({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User List</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <Table noWrapper>
            {/* Table header luôn hiển thị */}
            <TableHeader className="bg-gray-100 dark:bg-stone-950 sticky top-0 z-10">
              <TableRow>
                <TableHead className="px-4 py-2">ID</TableHead>
                <TableHead className="px-4 py-2">Email</TableHead>
                <TableHead className="px-4 py-2">Username</TableHead>
                <TableHead className="px-4 py-2">Avatar</TableHead>
                <TableHead className="px-4 py-2">First Name</TableHead>
                <TableHead className="px-4 py-2">Last Name</TableHead>
                <TableHead className="px-4 py-2">Created At</TableHead>
                <TableHead className="px-4 py-2">Updated At</TableHead>
                <TableHead className="px-4 py-2">Time Zone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="px-4 py-2">{u.id}</TableCell>
                  <TableCell className="px-4 py-2">{u.email}</TableCell>
                  <TableCell className="px-4 py-2">{u.username}</TableCell>
                  <TableCell className="px-4 py-2">
                    {u.avatar ? (
                      <img src={u.avatar} className="w-8 h-8 rounded-full" />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-2">{u.firstName}</TableCell>
                  <TableCell className="px-4 py-2">{u.lastName}</TableCell>
                  <TableCell className="px-4 py-2">{u.created_at}</TableCell>
                  <TableCell className="px-4 py-2">{u.updated_at}</TableCell>
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
