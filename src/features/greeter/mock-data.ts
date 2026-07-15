import type { Candidate, Greeter, Proctor, Stages, StageState } from "./types";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_NAMES = [
  "Aarav", "Priya", "Marcus", "Elena", "Michael", "Sarah", "David", "Anya",
  "Liam", "Sophia", "Noah", "Isabella", "Ethan", "Mia", "Lucas", "Amelia",
  "Julian", "Chloe", "Adrian", "Zara", "Ravi", "Neha", "Arjun", "Kiara",
  "Omar", "Fatima", "Chen", "Wei", "Yuki", "Hana", "Diego", "Camila",
  "Tomas", "Ingrid", "Kofi", "Ade", "Nia", "Samir", "Layla", "Idris",
];
const LAST_NAMES = [
  "Sharma", "Patel", "Holloway", "Rodriguez", "Chen", "Williams", "Aris", "Volkov",
  "Smith", "Nguyen", "Kim", "Johansson", "Silva", "Okonkwo", "Hassan", "Fischer",
  "Rossi", "Dubois", "Martin", "Brown", "Iyer", "Reddy", "Khan", "Malik",
];
const ASSESSMENTS = [
  "Advanced Financial Architecture",
  "Medical Board Certification — Part A",
  "Bar Exam: Constitutional Law",
  "GMAT Advanced Quant",
  "Applied Physics III",
  "CPA — Regulation",
  "Nursing NCLEX-RN",
  "PE Civil Structural",
  "Data Structures Certification",
  "Aviation Ground School",
  "ITIL Foundation v4",
  "AWS Solutions Architect Pro",
  "Six Sigma Black Belt",
  "Clinical Pharmacology Exam",
  "Actuarial Exam FM",
];
const PROCTOR_NAMES = [
  "Jordan Vane", "Mark Peterson", "David Chen", "Sarah McKay",
  "Anika Rao", "Tobias Lee", "Priya Desai", "Marco Ricci",
];
const OTHER_GREETERS = [
  { id: "g-jonas", name: "Jonas Schmidt" },
  { id: "g-ren", name: "Ren Chen" },
  { id: "g-amara", name: "Amara Okafor" },
  { id: "g-mika", name: "Mika Tanaka" },
];

export const CURRENT_GREETER: Greeter = {
  id: "g-you",
  name: "Marcus Thorne",
};

export function createProctors(): Proctor[] {
  return PROCTOR_NAMES.map((name, i) => ({
    id: `p-${i}`,
    name,
    load: 0,
  }));
}

const STAGE_ORDER = ["eula", "system", "headshot", "room"] as const;

function randomStages(rand: () => number): Stages {
  const progress = Math.floor(rand() * 5);
  const inProgress = progress < 4 && rand() < 0.7;
  const stages: Stages = { eula: "not_started", system: "not_started", headshot: "not_started", room: "not_started" };
  STAGE_ORDER.forEach((k, i) => {
    if (i < progress) stages[k] = "completed";
    else if (i === progress && inProgress) stages[k] = "in_progress";
  });
  if (rand() < 0.05) {
    const flagKey = rand() < 0.5 ? "headshot" : "room";
    if (stages[flagKey] === "completed" || stages[flagKey] === "in_progress") {
      stages[flagKey] = "flagged";
    }
  }
  return stages;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function dateKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function scheduleFor(baseDate: Date, rand: () => number): { start: string; end: string } {
  const hour = 8 + Math.floor(rand() * 10);
  const minute = [0, 15, 30, 45][Math.floor(rand() * 4)];
  const durationH = 1 + Math.floor(rand() * 3);
  const start = new Date(baseDate);
  start.setHours(hour, minute, 0, 0);
  const end = new Date(start.getTime() + durationH * 60 * 60 * 1000);
  return { start: start.toISOString(), end: end.toISOString() };
}

export function generateCandidates(count = 250, seed = 42): Candidate[] {
  const rand = mulberry32(seed);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayPool = [yesterday, today, today, today, today, tomorrow];

  const proctors = createProctors();
  const candidates: Candidate[] = [];

  for (let i = 0; i < count; i++) {
    const day = dayPool[Math.floor(rand() * dayPool.length)];
    const { start, end } = scheduleFor(day, rand);
    const stages = randomStages(rand);
    const allDone = STAGE_ORDER.every((k) => stages[k] === "completed");
    const anyStarted = STAGE_ORDER.some((k) => stages[k] !== "not_started");

    let allocation: Candidate["allocation"];
    let proctorId: string | undefined;
    let proctorName: string | undefined;
    let disconnectReason: string | undefined;
    let disconnectedAt: number | undefined;

    if (!anyStarted || !allDone) {
      allocation = "precheck";
    } else {
      if (rand() < 0.45) {
        allocation = "allocated";
        const p = proctors[Math.floor(rand() * proctors.length)];
        p.load += 1;
        proctorId = p.id;
        proctorName = p.name;
        if (rand() < 0.25) {
          allocation = "reconnected";
          const reasons = [
            "Candidate network dropped",
            "Browser crashed unexpectedly",
            "Power / device shutdown",
            "Proctor stream disconnected",
            "Assessment platform timeout",
          ];
          disconnectReason = reasons[Math.floor(rand() * reasons.length)];
          disconnectedAt = Date.now() - Math.floor(rand() * 8 * 60_000);
        }
      } else {
        allocation = "unallocated";
      }
    }

    const reconnecting = rand() < 0.06 && allocation !== "allocated";

    let lock: Candidate["lock"] | undefined;
    if (rand() < 0.08 && (allocation === "precheck" || allocation === "unallocated")) {
      const other = OTHER_GREETERS[Math.floor(rand() * OTHER_GREETERS.length)];
      lock = {
        greeterId: other.id,
        greeterName: other.name,
        since: Date.now() - Math.floor(rand() * 4 * 60_000),
      };
    }

    const firstName = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    const assessmentTitle = ASSESSMENTS[Math.floor(rand() * ASSESSMENTS.length)];

    const idScore = 60 + Math.floor(rand() * 40);
    const verdict = idScore >= 90 ? "match" : idScore >= 75 ? "review" : "mismatch";

    const roomFlagPool = [
      "Second monitor detected",
      "Additional person in frame",
      "Phone visible on desk",
      "Poor lighting",
      "Papers/notes visible",
    ];
    const flags: string[] = [];
    if (rand() < 0.25) flags.push(roomFlagPool[Math.floor(rand() * roomFlagPool.length)]);
    if (rand() < 0.1) flags.push(roomFlagPool[Math.floor(rand() * roomFlagPool.length)]);

    candidates.push({
      id: `C-${(1000 + i).toString()}`,
      firstName,
      lastName,
      assessmentTitle,
      scheduleStart: start,
      scheduleEnd: end,
      dateKey: dateKey(day),
      stages,
      allocation,
      proctorId,
      proctorName,
      reconnecting,
      lock,
      system: {
        os: ["macOS 14.2", "Windows 11", "Ubuntu 22.04", "macOS 13.6"][Math.floor(rand() * 4)],
        browser: ["Chrome 121", "Edge 120", "Firefox 122", "Safari 17"][Math.floor(rand() * 4)],
        ramGb: [8, 16, 16, 32][Math.floor(rand() * 4)],
        latencyMs: 20 + Math.floor(rand() * 180),
        mic: rand() > 0.05,
        cam: rand() > 0.05,
      },
      idMatch: { score: idScore, verdict },
      roomScan: { flags },
      disconnectReason,
      disconnectedAt,
    });
  }

  return candidates;
}

export function advanceCandidates(candidates: Candidate[], rand: () => number): Candidate[] {
  const next = candidates.slice();
  const changes = 4 + Math.floor(rand() * 6);
  for (let i = 0; i < changes; i++) {
    const idx = Math.floor(rand() * next.length);
    const c = { ...next[idx] };
    if (c.reviewed) continue;
    const stageKeys = STAGE_ORDER;
    for (const k of stageKeys) {
      if (c.stages[k] === "in_progress") {
        const stages = { ...c.stages };
        stages[k] = "completed";
        const nextIdx = stageKeys.indexOf(k) + 1;
        if (nextIdx < stageKeys.length && stages[stageKeys[nextIdx]] === "not_started" && rand() < 0.6) {
          stages[stageKeys[nextIdx]] = "in_progress";
        }
        c.stages = stages;
        break;
      }
      if (c.stages[k] === "not_started") {
        const stages = { ...c.stages };
        stages[k] = "in_progress";
        c.stages = stages;
        break;
      }
    }
    if (c.reconnecting && rand() < 0.4) c.reconnecting = false;
    if (c.lock && c.lock.greeterId !== CURRENT_GREETER.id && Date.now() - c.lock.since > 5 * 60_000) {
      c.lock = undefined;
    }
    next[idx] = c;
  }
  if (rand() < 0.5) {
    const idx = Math.floor(rand() * next.length);
    if (!next[idx].reviewed) next[idx] = { ...next[idx], reconnecting: true };
  }
  return next;
}

export function reseedRand(seed: number) {
  return mulberry32(seed);
}

export const STAGE_LABELS: Record<import("./types").StageKey, string> = {
  eula: "EULA",
  system: "System Check",
  headshot: "Headshot-ID",
  room: "Room Scan",
};

export const STAGE_STATE_LABELS: Record<StageState, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
  flagged: "Flagged",
};
