
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH101", teacher: "Dr. Smith" },
  { id: 2, name: "Physics", code: "PHY201", teacher: "Dr. Johnson" },
  { id: 3, name: "Computer Science", code: "CS301", teacher: "Prof. Davis" },
];

const Index = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = subjects.find(
      (s) => 
        s.name.toLowerCase() === subjectName.toLowerCase() && 
        s.code.toLowerCase() === subjectCode.toLowerCase()
    );

    if (subject) {
      // Store the subject info in sessionStorage
      sessionStorage.setItem("currentSubject", JSON.stringify(subject));
      navigate("/attendance");
    } else {
      setError("Invalid subject name or code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Teacher Login</CardTitle>
          <CardDescription>
            Enter your subject credentials to take attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subject Name
              </label>
              <Input
                type="text"
                placeholder="e.g. Mathematics"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subject Code
              </label>
              <Input
                type="text"
                placeholder="e.g. MATH101"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
