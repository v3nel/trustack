import { Project, FreelancerProfile } from "./types";

export const mockProjects: Project[] = [
    {
        id: `proj-1`,
        name: `E-Commerce Redesign`,
        client: `Acme Corp`,
        description: `Complete redesign of the e-commerce platform with modern UI/UX, improved checkout flow, and mobile responsiveness.`,
        deadline: `2026-03-15`,
        publicLink: `client/proj-1`,
        createdAt: `2026-01-10`,
        tasks: [
            {
                id: `t1`,
                title: `Design homepage mockup`,
                status: `done`,
                priority: `high`,
                deadline: `2026-01-25`,
            },
            {
                id: `t2`,
                title: `Build product listing page`,
                status: `done`,
                priority: `high`,
                deadline: `2026-02-05`,
            },
            {
                id: `t3`,
                title: `Implement shopping cart`,
                status: `in-progress`,
                priority: `high`,
                deadline: `2026-02-20`,
            },
            {
                id: `t4`,
                title: `Checkout flow & payment integration`,
                status: `todo`,
                priority: `medium`,
                deadline: `2026-03-01`,
            },
            {
                id: `t5`,
                title: `Mobile responsiveness`,
                status: `todo`,
                priority: `medium`,
                deadline: `2026-03-10`,
            },
            {
                id: `t6`,
                title: `Performance optimization`,
                status: `todo`,
                priority: `low`,
                deadline: `2026-03-14`,
            },
        ],
        milestones: [
            {
                id: `m1`,
                title: `Design Phase Complete`,
                amount: 2500,
                status: `released`,
                tasks: [`t1`],
            },
            {
                id: `m2`,
                title: `Core Pages Built`,
                amount: 4000,
                status: `in-progress`,
                tasks: [`t2`, `t3`],
            },
            {
                id: `m3`,
                title: `Checkout & Payment`,
                amount: 3500,
                status: `locked`,
                tasks: [`t4`],
            },
            {
                id: `m4`,
                title: `Polish & Launch`,
                amount: 2000,
                status: `locked`,
                tasks: [`t5`, `t6`],
            },
        ],
    },
    {
        id: `proj-2`,
        name: `Brand Identity Package`,
        client: `Bloom Studio`,
        description: `Complete brand identity including logo design, color palette, typography, and brand guidelines document.`,
        deadline: `2026-02-28`,
        publicLink: `client/proj-2`,
        createdAt: `2026-01-20`,
        tasks: [
            {
                id: `t7`,
                title: `Research & moodboard`,
                status: `done`,
                priority: `high`,
                deadline: `2026-01-28`,
            },
            {
                id: `t8`,
                title: `Logo concepts (3 options)`,
                status: `done`,
                priority: `high`,
                deadline: `2026-02-05`,
            },
            {
                id: `t9`,
                title: `Color palette & typography`,
                status: `done`,
                priority: `medium`,
                deadline: `2026-02-12`,
            },
            {
                id: `t10`,
                title: `Brand guidelines document`,
                status: `in-progress`,
                priority: `medium`,
                deadline: `2026-02-22`,
            },
            {
                id: `t11`,
                title: `Social media templates`,
                status: `todo`,
                priority: `low`,
                deadline: `2026-02-27`,
            },
        ],
        milestones: [
            {
                id: `m5`,
                title: `Research & Concepts`,
                amount: 1500,
                status: `released`,
                tasks: [`t7`, `t8`],
            },
            {
                id: `m6`,
                title: `Brand Assets`,
                amount: 2000,
                status: `in-progress`,
                tasks: [`t9`, `t10`],
            },
            {
                id: `m7`,
                title: `Final Deliverables`,
                amount: 1000,
                status: `locked`,
                tasks: [`t11`],
            },
        ],
    },
    {
        id: `proj-3`,
        name: `Mobile App MVP`,
        client: `FitTrack Inc`,
        description: `Build a cross-platform mobile app MVP for fitness tracking with workout logging, progress charts, and social features.`,
        deadline: `2026-04-30`,
        publicLink: `client/proj-3`,
        createdAt: `2026-02-01`,
        tasks: [
            {
                id: `t12`,
                title: `Wireframes & user flows`,
                status: `done`,
                priority: `high`,
                deadline: `2026-02-14`,
            },
            {
                id: `t13`,
                title: `Set up project & CI/CD`,
                status: `in-progress`,
                priority: `high`,
                deadline: `2026-02-20`,
            },
            {
                id: `t14`,
                title: `Auth & onboarding screens`,
                status: `todo`,
                priority: `high`,
                deadline: `2026-03-05`,
            },
            {
                id: `t15`,
                title: `Workout logging feature`,
                status: `todo`,
                priority: `high`,
                deadline: `2026-03-20`,
            },
            {
                id: `t16`,
                title: `Progress charts & stats`,
                status: `todo`,
                priority: `medium`,
                deadline: `2026-04-05`,
            },
            {
                id: `t17`,
                title: `Social feed & sharing`,
                status: `todo`,
                priority: `low`,
                deadline: `2026-04-20`,
            },
            {
                id: `t18`,
                title: `Testing & bug fixes`,
                status: `todo`,
                priority: `high`,
                deadline: `2026-04-28`,
            },
        ],
        milestones: [
            {
                id: `m8`,
                title: `Design & Setup`,
                amount: 3000,
                status: `released`,
                tasks: [`t12`, `t13`],
            },
            {
                id: `m9`,
                title: `Core Features`,
                amount: 5000,
                status: `locked`,
                tasks: [`t14`, `t15`],
            },
            {
                id: `m10`,
                title: `Advanced Features`,
                amount: 4000,
                status: `locked`,
                tasks: [`t16`, `t17`],
            },
            {
                id: `m11`,
                title: `Launch Ready`,
                amount: 2000,
                status: `locked`,
                tasks: [`t18`],
            },
        ],
    },
];

export const mockProfile: FreelancerProfile = {
    name: `Alex Morgan`,
    email: `alex@trustack.dev`,
    title: `Full-Stack Developer & Designer`,
    avatar: ``,
    bio: `Passionate freelancer with 6+ years of experience building web and mobile applications. I love turning complex problems into simple, beautiful solutions.`,
    hourlyRate: 95,
    paymentMethod: `Bank Transfer (ACH)`,
    notifications: {
        email: true,
        push: true,
        weeklyDigest: false,
    },
};

// Helper functions
export function getProjectProgress(project: Project): number {
    if (project.tasks.length === 0) return 0;
    const done = project.tasks.filter((t) => t.status === `done`).length;
    return Math.round((done / project.tasks.length) * 100);
}

export function getProjectTotalBudget(project: Project): number {
    return project.milestones.reduce((sum, m) => sum + m.amount, 0);
}

export function getProjectPaidAmount(project: Project): number {
    return project.milestones
        .filter((m) => m.status === `released`)
        .reduce((sum, m) => sum + m.amount, 0);
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat(`en-US`, {
        style: `currency`,
        currency: `USD`,
        minimumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(`en-US`, {
        month: `short`,
        day: `numeric`,
        year: `numeric`,
    });
}
