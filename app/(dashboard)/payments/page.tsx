"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  Lock,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import {
  mockProjects,
  getProjectTotalBudget,
  getProjectPaidAmount,
  formatCurrency,
} from "@/lib/mock-data";
import type { MilestoneStatus } from "@/lib/types";

function MilestoneStatusIcon({ status }: { status: MilestoneStatus }) {
  switch (status) {
    case "released":
      return <CheckCircle2 className="size-4 text-emerald-500" />;
    case "in-progress":
      return <Clock className="size-4 text-blue-500" />;
    default:
      return <Lock className="size-4 text-muted-foreground" />;
  }
}

export default function PaymentsPage() {
  const totalBudget = mockProjects.reduce(
    (sum, p) => sum + getProjectTotalBudget(p),
    0
  );
  const totalPaid = mockProjects.reduce(
    (sum, p) => sum + getProjectPaidAmount(p),
    0
  );
  const totalLocked = totalBudget - totalPaid;
  const allMilestones = mockProjects.flatMap((p) =>
    p.milestones.map((m) => ({
      ...m,
      projectName: p.name,
      projectId: p.id,
    }))
  );
  const released = allMilestones.filter((m) => m.status === "released");
  const active = allMilestones.filter((m) => m.status === "in-progress");
  const locked = allMilestones.filter((m) => m.status === "locked");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Payments & Escrow
        </h1>
        <p className="text-muted-foreground">
          Track milestone payments across all your projects.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <DollarSign className="size-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalPaid)}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                {released.length} milestones released
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <Shield className="size-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Escrow</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalLocked)}
              </p>
              <p className="text-xs text-muted-foreground">
                {active.length + locked.length} milestones pending
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
              <TrendingUp className="size-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalBudget)}
              </p>
              <Progress
                value={(totalPaid / totalBudget) * 100}
                className="mt-1 h-1.5"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-project breakdown */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">By Project</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {mockProjects.map((project) => {
            const budget = getProjectTotalBudget(project);
            const paid = getProjectPaidAmount(project);
            const pct = Math.round((paid / budget) * 100);

            return (
              <Card key={project.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {project.name}
                      </CardTitle>
                      <CardDescription>{project.client}</CardDescription>
                    </div>
                    <Badge variant="secondary">{pct}% paid</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={pct} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatCurrency(paid)} received</span>
                    <span>{formatCurrency(budget)} total</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All milestones */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">All Milestones</h2>
        <Card>
          <CardContent className="divide-y pt-2">
            {allMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between py-3.5"
              >
                <div className="flex items-center gap-3">
                  <MilestoneStatusIcon status={milestone.status} />
                  <div>
                    <p className="text-sm font-medium">{milestone.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {milestone.projectName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">
                    {formatCurrency(milestone.amount)}
                  </span>
                  <Badge
                    variant={
                      milestone.status === "released"
                        ? "default"
                        : milestone.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {milestone.status === "released"
                      ? "Released"
                      : milestone.status === "in-progress"
                        ? "Active"
                        : "Locked"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* How Escrow Works */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="size-4 text-primary" />
            How Escrow Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Funds Locked",
                description:
                  "Client deposits payment into escrow when a milestone is created.",
                icon: Lock,
              },
              {
                step: "2",
                title: "Work Completed",
                description:
                  "As you complete linked tasks, the milestone progresses toward release.",
                icon: Clock,
              },
              {
                step: "3",
                title: "Payment Released",
                description:
                  "Once all linked tasks are done, funds are released to your account.",
                icon: CheckCircle2,
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
