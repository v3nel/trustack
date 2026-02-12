export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type MilestoneStatus = "locked" | "in-progress" | "released";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: string;
}

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  status: MilestoneStatus;
  tasks: string[]; // task IDs linked to this milestone
}

export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  deadline: string;
  tasks: Task[];
  milestones: Milestone[];
  publicLink: string;
  createdAt: string;
}

export interface FreelancerProfile {
  name: string;
  email: string;
  title: string;
  avatar: string;
  bio: string;
  hourlyRate: number;
  paymentMethod: string;
  notifications: {
    email: boolean;
    push: boolean;
    weeklyDigest: boolean;
  };
}
