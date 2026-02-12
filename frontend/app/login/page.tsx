"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  ArrowRight,
  Shield,
  Eye,
  CreditCard,
  Mail,
  Lock,
  User,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left — Branding Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-foreground/10 via-transparent to-transparent" />
            <div className="absolute top-1/4 -right-20 size-96 rounded-full bg-primary-foreground/5 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-primary-foreground/5 blur-3xl" />
          </div>

          {/* Logo */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground text-primary">
                <Zap className="size-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Trustack
              </span>
            </Link>
          </div>

          {/* Middle content */}
          <div className="relative z-10 space-y-8">
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight">
                Take control of your
                <br />
                freelance career
              </h2>
              <p className="mt-4 max-w-md text-primary-foreground/70">
                Join thousands of freelancers who manage projects, build client
                trust, and get paid securely with Trustack.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Eye,
                  text: "Transparent project tracking for clients",
                },
                {
                  icon: Shield,
                  text: "Secure escrow-based milestone payments",
                },
                {
                  icon: CreditCard,
                  text: "Get paid on time, every time",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary-foreground/10">
                    <item.icon className="size-4" />
                  </div>
                  <span className="text-primary-foreground/80">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom testimonial */}
          <div className="relative z-10">
            <blockquote className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <p className="text-sm italic text-primary-foreground/80">
                &ldquo;Trustack changed how I work with clients. The
                transparency and escrow system gave them peace of mind, and I
                get paid faster.&rdquo;
              </p>
              <footer className="mt-3 flex items-center gap-2 text-xs text-primary-foreground/60">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary-foreground/10 text-[10px] font-semibold">
                  JD
                </div>
                Jamie Dean — UI/UX Designer
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right — Form Panel */}
        <div className="flex flex-col">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-6 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="size-4" />
              </div>
              <span className="text-lg font-bold">Trustack</span>
            </Link>
          </div>

          {/* Top right link */}
          <div className="hidden justify-end p-6 lg:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMode(isLogin ? "signup" : "login")}
            >
              {isLogin ? "Create an account" : "Sign in instead"}
            </Button>
          </div>

          {/* Form */}
          <div className="flex flex-1 items-center justify-center px-6 pb-12">
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isLogin
                    ? "Enter your credentials to access your dashboard"
                    : "Start managing your freelance projects today"}
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      window.location.href = "/dashboard";
                    }}
                    className="space-y-4"
                  >
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Alex Morgan"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-9"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="alex@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        {isLogin && (
                          <button
                            type="button"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-9"
                          required
                          minLength={8}
                        />
                      </div>
                      {!isLogin && (
                        <p className="text-xs text-muted-foreground">
                          Must be at least 8 characters
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="size-4" />
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          or continue with
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Button variant="outline" type="button">
                        <svg className="size-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" type="button">
                        <svg
                          className="size-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-center text-sm text-muted-foreground">
                {isLogin ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      onClick={() => setMode("signup")}
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("login")}
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>

              {!isLogin && (
                <div className="rounded-lg border border-dashed p-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-500 mt-0.5" />
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="font-medium text-foreground">
                        What you get with Trustack
                      </p>
                      <ul className="space-y-0.5">
                        <li>• Unlimited projects & tasks</li>
                        <li>• Shareable client progress links</li>
                        <li>• Secure milestone-based payments</li>
                        <li>• Free during beta — no credit card needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
