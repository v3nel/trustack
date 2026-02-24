import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getVariableValue } from "./devcycle";
import { FEATURE_ESCROW_ENABLED } from "@/lib/feature-flags";
import { FeatureFlagsProvider } from "@/lib/devcycle-client";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `Trustack — Freelancer Project Management`,
    description: `Manage projects, tasks, and client transparency with Trustack.`,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Evaluate all feature flags server-side and pass to client
    const escrowEnabled = await getVariableValue(FEATURE_ESCROW_ENABLED, true);

    const flags: Record<string, string | boolean | number> = {
        [FEATURE_ESCROW_ENABLED]: escrowEnabled,
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
                <FeatureFlagsProvider flags={flags}>
                    <ThemeProvider defaultTheme="light">
                        <TooltipProvider>{children}</TooltipProvider>
                    </ThemeProvider>
                </FeatureFlagsProvider>
            </body>
        </html>
    );
}
