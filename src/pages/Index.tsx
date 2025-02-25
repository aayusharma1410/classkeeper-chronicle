
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/AppLayout";

const classData = [
  { id: 1, name: "Computer Science 101", attendance: 85 },
  { id: 2, name: "Mathematics 202", attendance: 92 },
  { id: 3, name: "Physics 301", attendance: 78 },
  { id: 4, name: "English Literature", attendance: 88 },
];

const DashboardCard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) => (
  <Card className="animate-fadeIn">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </CardContent>
  </Card>
);

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-500 mt-2">Welcome to your attendance dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Classes"
            value="4"
            subtitle="Active courses this semester"
          />
          <DashboardCard
            title="Average Attendance"
            value="85.75%"
            subtitle="Across all classes"
          />
          <DashboardCard
            title="Total Students"
            value="120"
            subtitle="Enrolled students"
          />
          <DashboardCard
            title="Today's Classes"
            value="3"
            subtitle="Scheduled for today"
          />
        </div>

        <div className="rounded-lg border bg-white shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Recent Classes
            </h3>
            <div className="space-y-4">
              {classData.map((class_) => (
                <div
                  key={class_.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-slate-900">{class_.name}</h4>
                    <p className="text-sm text-slate-500">
                      {class_.attendance}% attendance
                    </p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
