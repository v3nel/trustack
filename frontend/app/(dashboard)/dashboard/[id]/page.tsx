"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    CheckCircle2,
    Circle,
    Clock,
    Copy,
    ExternalLink,
    Link2,
    AlertCircle,
} from "lucide-react";
import {
    mockProjects,
    getProjectProgress,
    getProjectTotalBudget,
    getProjectPaidAmount,
    formatCurrency,
    formatDate,
} from "@/lib/mock-data";
import type { TaskStatus, TaskPriority } from "@/lib/types";

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

function PriorityBadge({ priority }: { priority: TaskPriority }) {
    const colors = {
        high: `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`,
        medium: `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`,
        low: `bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`,
    };
    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors[priority]}`}
        >
            {priority}
        </span>
    );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = mockProjects.find((p) => p.id === id);
    const [copied, setCopied] = useState(false);

    if (!project) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
                <AlertCircle className="size-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Project not found</h2>
                <Button variant="outline" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="size-4" /> Back to Dashboard
                    </Link>
                </Button>
            </div>
        );
    }

    const progress = getProjectProgress(project);
    const totalBudget = getProjectTotalBudget(project);
    const paid = getProjectPaidAmount(project);
    const clientUrl =
        typeof window !== `undefined`
            ? `${window.location.origin}/client/${project.id}`
            : `/client/${project.id}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(clientUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const statusOrder: TaskStatus[] = [`in-progress`, `todo`, `done`];
    const sortedTasks = [...project.tasks].sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <Button variant="ghost" size="sm" className="mb-4" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="size-4" /> Back
                    </Link>
                </Button>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            {project.name}
                        </h1>
                        <p className="text-muted-foreground">{project.client}</p>
                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/client/${project.id}`} target="_blank">
                                <ExternalLink className="size-4" /> Client View
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Progress & Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-semibold">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2.5" />
                        <p className="mt-2 text-xs text-muted-foreground">
                            {project.tasks.filter((t) => t.status === `done`).length} of{` `}
                            {project.tasks.length} tasks complete
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground">Deadline</p>
                        <p className="text-xl font-bold">{formatDate(project.deadline)}</p>
                        <p className="text-xs text-muted-foreground">
                            Started {formatDate(project.createdAt)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="text-xl font-bold">
                            {formatCurrency(paid)}
                            {` `}
                            <span className="text-sm font-normal text-muted-foreground">
                                / {formatCurrency(totalBudget)}
                            </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {project.milestones.filter((m) => m.status === `released`).length} of
                            {` `}
                            {project.milestones.length} milestones paid
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Client Link */}
            <Card>
                <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Link2 className="size-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">Public Client Link</p>
                            <p className="text-xs text-muted-foreground">
                                Share this link with your client for read-only progress tracking
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <code className="rounded-md bg-muted px-3 py-1.5 text-xs">{clientUrl}</code>
                        <Button variant="outline" size="sm" onClick={handleCopyLink}>
                            <Copy className="size-3.5" />
                            {copied ? `Copied!` : `Copy`}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Tasks */}
                <div className="lg:col-span-2">
                    <h2 className="mb-4 text-lg font-semibold">Tasks</h2>
                    <Card>
                        <CardContent className="divide-y pt-2">
                            {sortedTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <StatusIcon status={task.status} />
                                        <div>
                                            <p
                                                className={`text-sm font-medium ${task.status === `done` ? `line-through text-muted-foreground` : ``}`}
                                            >
                                                {task.title}
                                            </p>
                                            {task.deadline && (
                                                <p className="text-xs text-muted-foreground">
                                                    Due {formatDate(task.deadline)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PriorityBadge priority={task.priority} />
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
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Milestones Sidebar */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold">Milestones</h2>
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
                                    <CardContent className="pt-4 pb-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {milestone.title}
                                                </p>
                                                <p className="text-lg font-bold">
                                                    {formatCurrency(milestone.amount)}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={
                                                    milestone.status === `released`
                                                        ? `default`
                                                        : `outline`
                                                }
                                                className="text-xs"
                                            >
                                                {milestone.status === `released`
                                                    ? `Paid`
                                                    : milestone.status === `in-progress`
                                                      ? `Active`
                                                      : `Locked`}
                                            </Badge>
                                        </div>
                                        <Separator className="my-2" />
                                        <p className="text-xs text-muted-foreground">
                                            {milestone.tasks.length} linked task
                                            {milestone.tasks.length !== 1 ? `s` : ``}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
