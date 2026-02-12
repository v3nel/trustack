"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  CheckCircle2,
  Clock,
  DollarSign,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import {
  mockProjects,
  getProjectProgress,
  getProjectTotalBudget,
  getProjectPaidAmount,
  formatCurrency,
  formatDate,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const totalTasks = mockProjects.reduce(
    (sum, p) => sum + p.tasks.length,
    0
  );
  const completedTasks = mockProjects.reduce(
    (sum, p) => sum + p.tasks.filter((t) => t.status === "done").length,
    0
  );
  const totalEarned = mockProjects.reduce(
    (sum, p) => sum + getProjectPaidAmount(p),
    0
  );
  const totalBudget = mockProjects.reduce(
    (sum, p) => sum + getProjectTotalBudget(p),
    0
  );
  const upcomingDeadlines = mockProjects
    .flatMap((p) =>
      p.tasks
        .filter((t) => t.status !== "done" && t.deadline)
        .map((t) => ({ ...t, projectName: p.name, projectId: p.id }))
    )
    .sort(
      (a, b) =>
        new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Alex. Here&apos;s your overview.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">
            <Plus className="size-4" /> New Project
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tasks Done</p>
              <p className="text-2xl font-bold">
                {completedTasks}
                <span className="text-sm font-normal text-muted-foreground">
                  /{totalTasks}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Clock className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold">{mockProjects.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <CalendarDays className="size-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Deadline</p>
              <p className="text-2xl font-bold">
                {upcomingDeadlines[0]
                  ? formatDate(upcomingDeadlines[0].deadline!)
                  : "—"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
              <DollarSign className="size-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Earned</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalEarned)}
                <span className="text-sm font-normal text-muted-foreground">
                  /{formatCurrency(totalBudget)}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Active Projects</h2>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {mockProjects.map((project) => {
            const progress = getProjectProgress(project);
            const totalBudget = getProjectTotalBudget(project);
            const paid = getProjectPaidAmount(project);
            const doneTasks = project.tasks.filter(
              (t) => t.status === "done"
            ).length;

            return (
              <Link key={project.id} href={`/dashboard/${project.id}`}>
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/20 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {project.name}
                        </CardTitle>
                        <CardDescription>{project.client}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {progress}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {doneTasks}/{project.tasks.length} tasks
                      </span>
                      <span>Due {formatDate(project.deadline)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatCurrency(paid)} / {formatCurrency(totalBudget)}
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Upcoming Deadlines</h2>
        <Card>
          <CardContent className="divide-y pt-2">
            {upcomingDeadlines.map((task) => (
              <Link
                key={task.id}
                href={`/dashboard/${task.projectId}`}
                className="flex items-center justify-between py-3 transition-colors hover:text-primary"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`size-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.projectName}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  {formatDate(task.deadline!)}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
