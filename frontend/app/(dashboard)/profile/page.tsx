"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, Bell, Palette, Save, Moon, Sun, Monitor } from "lucide-react";
import { mockProfile } from "@/lib/mock-data";
import { useTheme } from "@/components/theme-provider";

export default function ProfilePage() {
    const { theme, setTheme } = useTheme();
    const [profile, setProfile] = useState(mockProfile);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Profile & Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your account, payments, and preferences.
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="size-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="payments" className="gap-2">
                        <CreditCard className="size-4" /> Payments
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="size-4" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="gap-2">
                        <Palette className="size-4" /> Appearance
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Profile</CardTitle>
                            <CardDescription>
                                This information is visible to clients on project pages.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="size-20">
                                    <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                                        {profile.name
                                            .split(` `)
                                            .map((n) => n[0])
                                            .join(``)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                                    <p className="text-sm text-muted-foreground">{profile.title}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={profile.name}
                                        onChange={(e) =>
                                            setProfile({ ...profile, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) =>
                                            setProfile({ ...profile, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="title">Professional Title</Label>
                                    <Input
                                        id="title"
                                        value={profile.title}
                                        onChange={(e) =>
                                            setProfile({ ...profile, title: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        rows={4}
                                        value={profile.bio}
                                        onChange={(e) =>
                                            setProfile({ ...profile, bio: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button>
                                    <Save className="size-4" /> Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Payments Tab */}
                <TabsContent value="payments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Settings</CardTitle>
                            <CardDescription>
                                Configure how you receive payments from clients.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="rate">Hourly Rate (USD)</Label>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={profile.hourlyRate}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                hourlyRate: Number(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="method">Payment Method</Label>
                                    <Input
                                        id="method"
                                        value={profile.paymentMethod}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                paymentMethod: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="rounded-lg border border-dashed p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                        <CreditCard className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Connect Payment Provider</h4>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Link your Stripe or PayPal account to receive automatic
                                            milestone payments directly to your bank account.
                                        </p>
                                        <Button variant="outline" size="sm" className="mt-3">
                                            Connect Account
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button>
                                    <Save className="size-4" /> Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Choose how you want to be notified about project updates.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive emails about task updates and milestones
                                        </p>
                                    </div>
                                    <Switch
                                        checked={profile.notifications.email}
                                        onCheckedChange={(checked) =>
                                            setProfile({
                                                ...profile,
                                                notifications: {
                                                    ...profile.notifications,
                                                    email: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Push Notifications</p>
                                        <p className="text-sm text-muted-foreground">
                                            Get browser push notifications for important events
                                        </p>
                                    </div>
                                    <Switch
                                        checked={profile.notifications.push}
                                        onCheckedChange={(checked) =>
                                            setProfile({
                                                ...profile,
                                                notifications: {
                                                    ...profile.notifications,
                                                    push: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Weekly Digest</p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive a weekly summary of project progress and
                                            earnings
                                        </p>
                                    </div>
                                    <Switch
                                        checked={profile.notifications.weeklyDigest}
                                        onCheckedChange={(checked) =>
                                            setProfile({
                                                ...profile,
                                                notifications: {
                                                    ...profile.notifications,
                                                    weeklyDigest: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button>
                                    <Save className="size-4" /> Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize the look and feel of your dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label className="mb-3 block">Theme</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setTheme(`light`)}
                                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                                            theme === `light`
                                                ? `border-primary bg-primary/5`
                                                : `border-border hover:border-primary/50`
                                        }`}
                                    >
                                        <Sun className="size-6" />
                                        <span className="text-sm font-medium">Light</span>
                                    </button>
                                    <button
                                        onClick={() => setTheme(`dark`)}
                                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                                            theme === `dark`
                                                ? `border-primary bg-primary/5`
                                                : `border-border hover:border-primary/50`
                                        }`}
                                    >
                                        <Moon className="size-6" />
                                        <span className="text-sm font-medium">Dark</span>
                                    </button>
                                    <button
                                        onClick={() => setTheme(`system`)}
                                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                                            theme === `system`
                                                ? `border-primary bg-primary/5`
                                                : `border-border hover:border-primary/50`
                                        }`}
                                    >
                                        <Monitor className="size-6" />
                                        <span className="text-sm font-medium">System</span>
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
