export type StageKey = "eula" | "system" | "headshot" | "room";
export type StageState = "not_started" | "in_progress" | "completed" | "flagged";

export type Stages = Record<StageKey, StageState>;

export type AllocationStatus = "precheck" | "unallocated" | "allocated" | "reconnected";

export interface Proctor {
  id: string;
  name: string;
  load: number;
}

export interface Greeter {
  id: string;
  name: string;
}

export interface CandidateLock {
  greeterId: string;
  greeterName: string;
  since: number;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  assessmentTitle: string;
  scheduleStart: string;
  scheduleEnd: string;
  dateKey: string;
  stages: Stages;
  allocation: AllocationStatus;
  proctorId?: string;
  proctorName?: string;
  reconnecting?: boolean;
  lock?: CandidateLock;
  system: {
    os: string;
    browser: string;
    ramGb: number;
    latencyMs: number;
    mic: boolean;
    cam: boolean;
  };
  idMatch: {
    score: number;
    verdict: "match" | "review" | "mismatch";
  };
  roomScan: {
    flags: string[];
  };
  reviewed?: "approved" | "rejected" | "hold";
  disconnectReason?: string;
  disconnectedAt?: number;
}
