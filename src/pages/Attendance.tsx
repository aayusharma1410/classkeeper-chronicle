
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const attendanceData = [
  {
    id: 1,
    className: "Computer Science 101",
    time: "09:00 AM",
    totalStudents: 30,
    presentStudents: 28,
  },
  {
    id: 2,
    className: "Mathematics 202",
    time: "11:00 AM",
    totalStudents: 25,
    presentStudents: 23,
  },
  {
    id: 3,
    className: "Physics 301",
    time: "02:00 PM",
    totalStudents: 20,
    presentStudents: 18,
  },
];

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Attendance</h2>
          <p className="text-slate-500 mt-2">Manage class attendance records</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </Card>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.className}
                    </TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell>{record.totalStudents}</TableCell>
                    <TableCell>{record.presentStudents}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Take Attendance
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Attendance;
