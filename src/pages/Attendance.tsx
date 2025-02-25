
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
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

// Sample data - in a real app, this would come from a backend
const studentsData = {
  "MATH101": [
    { id: 1, name: "John Smith", attendance: [] },
    { id: 2, name: "Emma Wilson", attendance: [] },
    { id: 3, name: "Michael Brown", attendance: [] },
  ],
  "PHY201": [
    { id: 4, name: "Sarah Johnson", attendance: [] },
    { id: 5, name: "David Lee", attendance: [] },
    { id: 6, name: "Lisa Anderson", attendance: [] },
  ],
  "CS301": [
    { id: 7, name: "James Wilson", attendance: [] },
    { id: 8, name: "Emily Davis", attendance: [] },
    { id: 9, name: "Robert Taylor", attendance: [] },
  ]
};

const Attendance = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const subjectData = sessionStorage.getItem("currentSubject");
    if (!subjectData) {
      navigate("/");
      return;
    }
    const subject = JSON.parse(subjectData);
    setCurrentSubject(subject);
    setStudents(studentsData[subject.code as keyof typeof studentsData] || []);
  }, [navigate]);

  const handleAttendanceUpdate = (studentId: number, present: boolean) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const handleSaveAttendance = () => {
    // In a real app, this would save to a backend
    console.log("Saving attendance for:", {
      subject: currentSubject?.name,
      date: date?.toISOString(),
      records: attendanceRecords
    });
    setIsOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("currentSubject");
    navigate("/");
  };

  if (!currentSubject) return null;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Attendance</h2>
            <p className="text-slate-500 mt-2">
              {currentSubject.name} ({currentSubject.code})
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
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

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Student List</h3>
                <Button onClick={() => setIsOpen(true)}>Take Attendance</Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          attendanceRecords[student.id] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {attendanceRecords[student.id] ? 'Present' : 'Not marked'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Take Attendance - {currentSubject.name}</SheetTitle>
              <SheetDescription>
                {date?.toLocaleDateString()}
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
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          attendanceRecords[student.id] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {attendanceRecords[student.id] ? 'Present' : 'Absent'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={attendanceRecords[student.id] ? "destructive" : "default"}
                          size="sm"
                          onClick={() => handleAttendanceUpdate(student.id, !attendanceRecords[student.id])}
                        >
                          Mark {attendanceRecords[student.id] ? 'Absent' : 'Present'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSaveAttendance}>
                  Save Attendance
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
};

export default Attendance;
