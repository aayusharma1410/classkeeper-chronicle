
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const attendanceData = [
  {
    id: 1,
    className: "Computer Science 101",
    time: "09:00 AM",
    totalStudents: 30,
    presentStudents: 28,
    students: [
      { id: 1, name: "John Smith", present: true },
      { id: 2, name: "Emma Wilson", present: true },
      { id: 3, name: "Michael Brown", present: false },
    ]
  },
  {
    id: 2,
    className: "Mathematics 202",
    time: "11:00 AM",
    totalStudents: 25,
    presentStudents: 23,
    students: [
      { id: 4, name: "Sarah Johnson", present: true },
      { id: 5, name: "David Lee", present: true },
      { id: 6, name: "Lisa Anderson", present: false },
    ]
  },
  {
    id: 3,
    className: "Physics 301",
    time: "02:00 PM",
    totalStudents: 20,
    presentStudents: 18,
    students: [
      { id: 7, name: "James Wilson", present: true },
      { id: 8, name: "Emily Davis", present: false },
      { id: 9, name: "Robert Taylor", present: true },
    ]
  },
];

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState<typeof attendanceData[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [attendanceState, setAttendanceState] = useState(attendanceData);

  const handleAttendanceUpdate = (classId: number, studentId: number, present: boolean) => {
    setAttendanceState(prevState => prevState.map(classItem => {
      if (classItem.id === classId) {
        return {
          ...classItem,
          students: classItem.students.map(student => {
            if (student.id === studentId) {
              return { ...student, present };
            }
            return student;
          }),
          presentStudents: present 
            ? classItem.presentStudents + 1 
            : classItem.presentStudents - 1
        };
      }
      return classItem;
    }));
  };

  const openAttendanceSheet = (classData: typeof attendanceData[0]) => {
    setSelectedClass(classData);
    setIsOpen(true);
  };

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
                {attendanceState.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.className}
                    </TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell>{record.totalStudents}</TableCell>
                    <TableCell>{record.presentStudents}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openAttendanceSheet(record)}
                      >
                        Take Attendance
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Take Attendance - {selectedClass?.className}</SheetTitle>
              <SheetDescription>
                {date?.toLocaleDateString()} | {selectedClass?.time}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedClass?.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          student.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {student.present ? 'Present' : 'Absent'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={student.present ? "destructive" : "default"}
                          size="sm"
                          onClick={() => {
                            if (selectedClass) {
                              handleAttendanceUpdate(selectedClass.id, student.id, !student.present);
                            }
                          }}
                        >
                          Mark {student.present ? 'Absent' : 'Present'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
};

export default Attendance;
