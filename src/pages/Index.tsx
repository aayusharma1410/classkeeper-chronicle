
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Book } from "lucide-react";

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
      sessionStorage.setItem("currentSubject", JSON.stringify(subject));
      navigate("/attendance");
    } else {
      setError("Invalid subject name or code");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)"
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Book className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Please login with your subject credentials</p>
        </div>

        <Card className="w-full backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Teacher Login</CardTitle>
            <CardDescription className="text-center">
              Enter your subject credentials to take attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject Name
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <Book className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject Code
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="e.g. MATH101"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <LockKeyhole className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md p-3">
                  {error}
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          Need help? Contact system administrator
        </div>
      </div>
    </div>
  );
};

export default Index;
