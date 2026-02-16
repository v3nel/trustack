"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, Zap, AlertCircle, ArrowLeft, Shield } from "lucide-react";
import {
    mockProjects,
    getProjectProgress,
    getProjectTotalBudget,
    getProjectPaidAmount,
    formatCurrency,
    formatDate,
} from "@/lib/mock-data";
import type { TaskStatus } from "@/lib/types";

function StatusIcon({ status }: { status: TaskStatus }) {
    switch (status) {
        case `done`:
            return <CheckCircle2 className="size-4 text-emerald-500" />;
        case `in-progress`:
            return <Clock className="size-4 text-blue-500" />;
        default:
            return <Circle className="size-4 text-muted-foreground" />;
    }
}

export default function ClientViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = mockProjects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
                <AlertCircle className="size-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Project not found</h2>
                <p className="text-muted-foreground">
                    This link may be invalid or the project may have been removed.
                </p>
                <Button variant="outline" asChild>
                    <Link href="/">
                        <ArrowLeft className="size-4" /> Go Home
                    </Link>
                </Button>
            </div>
        );
    }

    const progress = getProjectProgress(project);
    const totalBudget = getProjectTotalBudget(project);
    const paid = getProjectPaidAmount(project);
    const doneTasks = project.tasks.filter((t) => t.status === `done`).length;
    const inProgressTasks = project.tasks.filter((t) => t.status === `in-progress`).length;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card">
                <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Zap className="size-4" />
                        </div>
                        <span className="text-lg font-bold">Trustack</span>
                    </div>
                    <Badge variant="secondary" className="gap-1.5">
                        <Shield className="size-3" />
                        Client View
                    </Badge>
                </div>
            </header>

            <div className="mx-auto max-w-4xl px-6 py-8">
                <div className="space-y-8">
                    {/* Project Info */}
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            {project.name}
                        </h1>
                        <p className="mt-1 text-muted-foreground">{project.description}</p>
                    </div>

                    {/* Progress Overview */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-3xl font-bold text-primary">{progress}%</div>
                                <p className="text-sm text-muted-foreground">Complete</p>
                                <Progress value={progress} className="mt-3 h-2" />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-3xl font-bold">
                                    {doneTasks}
                                    <span className="text-lg text-muted-foreground">
                                        /{project.tasks.length}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">Tasks Done</p>
                                <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                                    {inProgressTasks} in progress
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-3xl font-bold">
                                    {formatDate(project.deadline)}
                                </div>
                                <p className="text-sm text-muted-foreground">Deadline</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Task List */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Project Tasks</h2>
                        <Card>
                            <CardContent className="divide-y pt-2">
                                {project.tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between py-3.5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <StatusIcon status={task.status} />
                                            <span
                                                className={`text-sm font-medium ${
                                                    task.status === `done`
                                                        ? `line-through text-muted-foreground`
                                                        : ``
                                                }`}
                                            >
                                                {task.title}
                                            </span>
                                        </div>
                                        <Badge
                                            variant={
                                                task.status === `done`
                                                    ? `default`
                                                    : task.status === `in-progress`
                                                      ? `secondary`
                                                      : `outline`
                                            }
                                            className="text-xs"
                                        >
                                            {task.status === `in-progress`
                                                ? `In Progress`
                                                : task.status === `done`
                                                  ? `Done`
                                                  : `To Do`}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Milestones / Payments */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Payment Milestones</h2>
                        <div className="space-y-3">
                            {project.milestones.map((milestone) => {
                                const statusColor =
                                    milestone.status === `released`
                                        ? `border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20`
                                        : milestone.status === `in-progress`
                                          ? `border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20`
                                          : ``;
                                return (
                                    <Card key={milestone.id} className={statusColor}>
                                        <CardContent className="flex items-center justify-between pt-4 pb-4">
                                            <div>
                                                <p className="font-medium">{milestone.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatCurrency(milestone.amount)}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={
                                                    milestone.status === `released`
                                                        ? `default`
                                                        : `outline`
                                                }
                                            >
                                                {milestone.status === `released`
                                                    ? `Released`
                                                    : milestone.status === `in-progress`
                                                      ? `In Progress`
                                                      : `Locked`}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                        <Separator className="my-6" />
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Total Budget</span>
                            <span className="font-semibold">{formatCurrency(totalBudget)}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Released</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(paid)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>
                        Powered by{` `}
                        <Link href="/" className="font-medium text-foreground hover:underline">
                            Trustack
                        </Link>
                        {` `}— Transparent freelance project management
                    </p>
                </div>
            </div>
        </div>
    );
}
