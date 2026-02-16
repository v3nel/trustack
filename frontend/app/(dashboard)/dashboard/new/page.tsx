"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ArrowLeft,
    Plus,
    Trash2,
    GripVertical,
    Link2,
    Copy,
    CheckCircle2,
    Circle,
    Clock,
    Calendar,
    ArrowRight,
    Briefcase,
    Sparkles,
} from "lucide-react";
import type { TaskPriority, TaskStatus } from "@/lib/types";

interface NewTask {
    id: string;
    title: string;
    priority: TaskPriority;
    deadline: string;
    status: TaskStatus;
}

export default function CreateProjectPage() {
    const [step, setStep] = useState(1);
    const [projectName, setProjectName] = useState(``);
    const [projectDescription, setProjectDescription] = useState(``);
    const [clientName, setClientName] = useState(``);
    const [clientEmail, setClientEmail] = useState(``);
    const [projectDeadline, setProjectDeadline] = useState(``);
    const [tasks, setTasks] = useState<NewTask[]>([
        {
            id: `new-1`,
            title: ``,
            priority: `medium`,
            deadline: ``,
            status: `todo`,
        },
    ]);
    const [linkGenerated, setLinkGenerated] = useState(false);
    const [copied, setCopied] = useState(false);

    const totalSteps = 3;
    const progressPct = Math.round((step / totalSteps) * 100);

    const addTask = () => {
        setTasks([
            ...tasks,
            {
                id: `new-${Date.now()}`,
                title: ``,
                priority: `medium`,
                deadline: ``,
                status: `todo`,
            },
        ]);
    };

    const removeTask = (id: string) => {
        if (tasks.length > 1) {
            setTasks(tasks.filter((t) => t.id !== id));
        }
    };

    const updateTask = (id: string, field: keyof NewTask, value: string) => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
    };

    const filledTasks = tasks.filter((t) => t.title.trim() !== ``);

    const canProceedStep1 = projectName.trim() !== `` && projectDescription.trim() !== ``;
    const canProceedStep2 = clientName.trim() !== `` && clientEmail.trim() !== ``;
    const canProceedStep3 = filledTasks.length > 0;

    const handleCopyLink = () => {
        const link =
            typeof window !== `undefined`
                ? `${window.location.origin}/client/proj-new`
                : `/client/proj-new`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGenerateLink = () => {
        setLinkGenerated(true);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <Button variant="ghost" size="sm" className="mb-4" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="size-4" /> Back to Dashboard
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Create New Project
                </h1>
                <p className="text-muted-foreground">
                    Set up your project and start tracking progress.
                </p>
            </div>

            {/* Progress indicator */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                        Step {step} of {totalSteps}
                    </span>
                    <span className="text-muted-foreground">{progressPct}%</span>
                </div>
                <Progress value={progressPct} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span className={step >= 1 ? `font-medium text-foreground` : ``}>
                        Project Details
                    </span>
                    <span className={step >= 2 ? `font-medium text-foreground` : ``}>
                        Client Info
                    </span>
                    <span className={step >= 3 ? `font-medium text-foreground` : ``}>
                        Tasks & Share
                    </span>
                </div>
            </div>

            {/* Step 1 — Project Details */}
            {step === 1 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                <Briefcase className="size-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Project Details</CardTitle>
                                <CardDescription>
                                    Name your project and describe the scope of work.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="project-name">
                                Project Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="project-name"
                                placeholder="e.g. E-Commerce Redesign"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="project-desc">
                                Description <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="project-desc"
                                placeholder="Describe the project scope, goals, and deliverables…"
                                rows={4}
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="project-deadline">Project Deadline</Label>
                            <Input
                                id="project-deadline"
                                type="date"
                                value={projectDeadline}
                                onChange={(e) => setProjectDeadline(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                onClick={() => setStep(2)}
                                disabled={!canProceedStep1}
                                size="lg"
                            >
                                Next: Client Info <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 2 — Client Information */}
            {step === 2 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <Circle className="size-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <CardTitle>Client Information</CardTitle>
                                <CardDescription>
                                    Add your client&apos;s details so they can follow progress.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="client-name">
                                    Client Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="client-name"
                                    placeholder="e.g. Acme Corp"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="client-email">
                                    Client Email <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="client-email"
                                    type="email"
                                    placeholder="client@company.com"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg border border-dashed p-4">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Tip:</span> Your
                                client will receive a read-only link to follow project progress.
                                They won&apos;t be able to edit anything.
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={() => setStep(1)}>
                                <ArrowLeft className="size-4" /> Back
                            </Button>
                            <Button
                                onClick={() => setStep(3)}
                                disabled={!canProceedStep2}
                                size="lg"
                            >
                                Next: Add Tasks <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 3 — Tasks & Share Link */}
            {step === 3 && (
                <div className="space-y-6">
                    {/* Task list */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                        <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <CardTitle>Project Tasks</CardTitle>
                                        <CardDescription>
                                            Define the tasks and deliverables for this project.
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="shrink-0">
                                    {filledTasks.length} task{filledTasks.length !== 1 ? `s` : ``}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {tasks.map((task, index) => (
                                <div
                                    key={task.id}
                                    className="flex items-start gap-2 rounded-lg border bg-card p-3"
                                >
                                    <div className="flex items-center pt-2 text-muted-foreground">
                                        <GripVertical className="size-4" />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-start gap-2">
                                            <div className="flex-1">
                                                <Input
                                                    placeholder={`Task ${index + 1} — e.g. Design homepage mockup`}
                                                    value={task.title}
                                                    onChange={(e) =>
                                                        updateTask(task.id, `title`, e.target.value)
                                                    }
                                                />
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="shrink-0 text-muted-foreground hover:text-destructive"
                                                onClick={() => removeTask(task.id)}
                                                disabled={tasks.length <= 1}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <div className="w-36">
                                                <Select
                                                    value={task.priority}
                                                    onValueChange={(v) =>
                                                        updateTask(
                                                            task.id,
                                                            `priority`,
                                                            v as TaskPriority,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="h-8 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="high">
                                                            <span className="flex items-center gap-1.5">
                                                                <span className="size-1.5 rounded-full bg-red-500" />
                                                                High Priority
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="medium">
                                                            <span className="flex items-center gap-1.5">
                                                                <span className="size-1.5 rounded-full bg-amber-500" />
                                                                Medium
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="low">
                                                            <span className="flex items-center gap-1.5">
                                                                <span className="size-1.5 rounded-full bg-blue-500" />
                                                                Low
                                                            </span>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Input
                                                type="date"
                                                className="h-8 w-40 text-xs"
                                                value={task.deadline}
                                                onChange={(e) =>
                                                    updateTask(task.id, `deadline`, e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Button
                                variant="outline"
                                className="w-full border-dashed"
                                onClick={addTask}
                            >
                                <Plus className="size-4" /> Add Task
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Project Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Project Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 text-sm sm:grid-cols-2">
                                <div>
                                    <span className="text-muted-foreground">Project</span>
                                    <p className="font-medium">{projectName || `—`}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Client</span>
                                    <p className="font-medium">{clientName || `—`}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Client Email</span>
                                    <p className="font-medium">{clientEmail || `—`}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Deadline</span>
                                    <p className="font-medium">
                                        {projectDeadline
                                            ? new Date(projectDeadline).toLocaleDateString(
                                                  `en-US`,
                                                  {
                                                      month: `short`,
                                                      day: `numeric`,
                                                      year: `numeric`,
                                                  },
                                              )
                                            : `—`}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <span className="text-muted-foreground">Tasks</span>
                                    <p className="font-medium">
                                        {filledTasks.length} task
                                        {filledTasks.length !== 1 ? `s` : ``} defined
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Generate Client Link */}
                    <Card
                        className={
                            linkGenerated
                                ? `border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/10`
                                : ``
                        }
                    >
                        <CardContent className="pt-6">
                            {!linkGenerated ? (
                                <div className="flex flex-col items-center gap-4 py-4 text-center">
                                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                                        <Link2 className="size-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Generate Client Share Link
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Create a read-only link your client can use to track
                                            project progress in real-time.
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleGenerateLink}
                                        disabled={!canProceedStep3}
                                        size="lg"
                                    >
                                        <Sparkles className="size-4" /> Generate Link
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="size-5 text-emerald-500" />
                                        <div>
                                            <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                                                Client link generated!
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Share this link with {clientName || `your client`}{` `}
                                                for read-only access.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 truncate rounded-md bg-background border px-3 py-2 text-sm">
                                            {typeof window !== `undefined`
                                                ? `${window.location.origin}/client/proj-new`
                                                : `/client/proj-new`}
                                        </code>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleCopyLink}
                                        >
                                            <Copy className="size-3.5" />
                                            {copied ? `Copied!` : `Copy`}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Footer actions */}
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setStep(2)}>
                            <ArrowLeft className="size-4" /> Back
                        </Button>
                        <Button size="lg" asChild>
                            <Link href="/dashboard">
                                <CheckCircle2 className="size-4" /> Create Project
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
