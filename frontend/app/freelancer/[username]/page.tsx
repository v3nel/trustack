"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    CheckCircle2,
    Circle,
    Clock,
    Zap,
    MapPin,
    Mail,
    Briefcase,
    Star,
    ExternalLink,
} from "lucide-react";
import { mockProjects, mockProfile, getProjectProgress, formatDate } from "@/lib/mock-data";
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

export default function ShareableProfilePage() {
    const totalTasks = mockProjects.reduce((sum, p) => sum + p.tasks.length, 0);
    const completedTasks = mockProjects.reduce(
        (sum, p) => sum + p.tasks.filter((t) => t.status === `done`).length,
        0,
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Zap className="size-4" />
                        </div>
                        <span className="text-lg font-bold">Trustack</span>
                    </div>
                    <Badge variant="secondary" className="gap-1.5">
                        <ExternalLink className="size-3" />
                        Public Profile
                    </Badge>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-6 py-10">
                <div className="space-y-10">
                    {/* Profile Hero */}
                    <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
                        <Avatar className="size-24 shrink-0 shadow-lg ring-4 ring-background">
                            <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
                                {mockProfile.name
                                    .split(` `)
                                    .map((n) => n[0])
                                    .join(``)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="mt-4 sm:mt-0">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                {mockProfile.name}
                            </h1>
                            <p className="mt-1 text-lg text-muted-foreground">
                                {mockProfile.title}
                            </p>
                            <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
                                {mockProfile.bio}
                            </p>
                            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                                <span className="flex items-center gap-1.5">
                                    <Mail className="size-3.5" />
                                    {mockProfile.email}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Briefcase className="size-3.5" />
                                    {mockProjects.length} active projects
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                                    4.9 rating
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-3xl font-bold text-primary">
                                    {mockProjects.length}
                                </div>
                                <p className="text-sm text-muted-foreground">Active Projects</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-3xl font-bold">
                                    {completedTasks}
                                    <span className="text-lg text-muted-foreground">
                                        /{totalTasks}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">Tasks Complete</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-3xl font-bold">
                                    {Math.round((completedTasks / totalTasks) * 100)}%
                                </div>
                                <p className="text-sm text-muted-foreground">Completion Rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Projects */}
                    <div>
                        <h2 className="mb-5 text-xl font-semibold">Projects</h2>
                        <div className="space-y-5">
                            {mockProjects.map((project) => {
                                const progress = getProjectProgress(project);
                                const doneTasks = project.tasks.filter(
                                    (t) => t.status === `done`,
                                ).length;
                                const inProgressCount = project.tasks.filter(
                                    (t) => t.status === `in-progress`,
                                ).length;

                                return (
                                    <Card key={project.id} className="overflow-hidden">
                                        <CardHeader className="pb-3">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <CardTitle className="text-lg">
                                                        {project.name}
                                                    </CardTitle>
                                                    <CardDescription className="mt-1">
                                                        {project.description}
                                                    </CardDescription>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="shrink-0 self-start text-sm"
                                                >
                                                    {progress}% complete
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {/* Progress bar */}
                                            <div>
                                                <Progress value={progress} className="h-2.5" />
                                                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>
                                                        {doneTasks} of {project.tasks.length} tasks
                                                        done
                                                        {inProgressCount > 0 &&
                                                            ` · ${inProgressCount} in progress`}
                                                    </span>
                                                    <span>Due {formatDate(project.deadline)}</span>
                                                </div>
                                            </div>

                                            <Separator />

                                            {/* Task list */}
                                            <div className="space-y-0 divide-y">
                                                {project.tasks.map((task) => (
                                                    <div
                                                        key={task.id}
                                                        className="flex items-center justify-between py-2.5"
                                                    >
                                                        <div className="flex items-center gap-2.5">
                                                            <StatusIcon status={task.status} />
                                                            <span
                                                                className={`text-sm ${
                                                                    task.status === `done`
                                                                        ? `line-through text-muted-foreground`
                                                                        : `font-medium`
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
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
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
