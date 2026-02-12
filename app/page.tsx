import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  Shield,
  Eye,
  BarChart3,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Users,
  DollarSign,
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Project Management",
    description:
      "Organize projects with tasks, deadlines, and priorities. Track progress with visual indicators.",
  },
  {
    icon: Eye,
    title: "Client Transparency",
    description:
      "Share read-only project views with clients. Build trust with real-time progress updates.",
  },
  {
    icon: Shield,
    title: "Escrow Payments",
    description:
      "Secure milestone-based payments. Funds are locked until work is verified and approved.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Visual dashboards with task completion, deadlines, and payment tracking at a glance.",
  },
];

const stats = [
  { value: "12K+", label: "Freelancers", icon: Users },
  { value: "$4.2M", label: "Payments Processed", icon: DollarSign },
  { value: "98%", label: "Satisfaction Rate", icon: CheckCircle2 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-4" />
            </div>
            <span className="text-xl font-bold tracking-tight">Trustack</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">
                Get Started <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <Zap className="size-3.5 text-primary" />
              Built for independent professionals
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Freelance with
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {" "}
                confidence
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Manage projects, track progress, and build client trust — all in
              one place. Trustack gives freelancers the tools to deliver
              transparently and get paid securely.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/login">
                  Start Free Trial <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/client/proj-1">See Client View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 px-6 py-12 sm:flex-row sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 text-center">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="size-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything you need to freelance smarter
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From project kickoff to final payment — Trustack has you covered.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to professional project delivery.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create a project",
                description:
                  "Set up your project with tasks, milestones, and payment terms in minutes.",
              },
              {
                step: "02",
                title: "Share with your client",
                description:
                  "Generate a public link so clients can follow progress in real-time.",
              },
              {
                step: "03",
                title: "Get paid securely",
                description:
                  "Milestone payments are released automatically when tasks are completed.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col items-center gap-6 py-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to take control of your freelance career?
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              Join thousands of freelancers who trust Trustack to manage
              projects, communicate with clients, and secure payments.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold"
              asChild
            >
              <Link href="/login">
                Get Started — It&apos;s Free <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-primary" />
            <span className="font-semibold">Trustack</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Trustack. Built for freelancers.
          </p>
        </div>
      </footer>
    </div>
  );
}
