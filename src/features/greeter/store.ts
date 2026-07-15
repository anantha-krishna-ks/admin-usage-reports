import { useSyncExternalStore } from "react";
import {
  CURRENT_GREETER,
  advanceCandidates,
  createProctors,
  generateCandidates,
  reseedRand,
} from "./mock-data";
import type { Candidate, Proctor } from "./types";

interface State {
  candidates: Candidate[];
  proctors: Proctor[];
  rrIndex: number;
  currentGreeter: typeof CURRENT_GREETER;
  version: number;
}

let state: State = {
  candidates: generateCandidates(260, 42),
  proctors: createProctors(),
  rrIndex: 0,
  currentGreeter: CURRENT_GREETER,
  version: 0,
};

state.candidates.forEach((c) => {
  if (c.proctorId) {
    const p = state.proctors.find((x) => x.id === c.proctorId);
    if (p) p.load += 1;
  }
});

const listeners = new Set<() => void>();
const tickRand = reseedRand(1234);

function emit() {
  state = { ...state, version: state.version + 1 };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getState() {
  return state;
}

export function useGreeterStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getState()),
    () => selector(getState()),
  );
}

export const greeterActions = {
  tick() {
    state.candidates = advanceCandidates(state.candidates, tickRand);
    emit();
  },
  lockForReview(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c) return;
    if (c.lock && c.lock.greeterId !== state.currentGreeter.id) return;
    c.lock = {
      greeterId: state.currentGreeter.id,
      greeterName: state.currentGreeter.name,
      since: Date.now(),
    };
    emit();
  },
  releaseLock(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c || !c.lock) return;
    if (c.lock.greeterId !== state.currentGreeter.id) return;
    c.lock = undefined;
    emit();
  },
  approve(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c) return;
    c.reviewed = "approved";
    c.lock = undefined;
    emit();
  },
  reject(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c) return;
    c.reviewed = "rejected";
    c.lock = undefined;
    emit();
  },
  hold(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c) return;
    c.reviewed = "hold";
    c.lock = undefined;
    emit();
  },
  autoAllocate(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c) return;
    const CAP = 6;
    const n = state.proctors.length;
    for (let i = 0; i < n; i++) {
      const idx = (state.rrIndex + i) % n;
      const p = state.proctors[idx];
      if (p.load < CAP) {
        p.load += 1;
        c.proctorId = p.id;
        c.proctorName = p.name;
        c.allocation = "allocated";
        c.lock = undefined;
        state.rrIndex = (idx + 1) % n;
        emit();
        return;
      }
    }
  },
  selfAllocate(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c) return;
    c.allocation = "allocated";
    c.proctorId = state.currentGreeter.id;
    c.proctorName = `${state.currentGreeter.name} (self)`;
    c.lock = undefined;
    c.disconnectReason = undefined;
    c.disconnectedAt = undefined;
    emit();
  },
  rerunPrecheck(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c) return;
    if (c.proctorId) {
      const p = state.proctors.find((x) => x.id === c.proctorId);
      if (p && p.load > 0) p.load -= 1;
    }
    c.stages = { eula: "not_started", system: "in_progress", headshot: "not_started", room: "not_started" };
    c.allocation = "precheck";
    c.reconnecting = false;
    c.disconnectReason = undefined;
    c.disconnectedAt = undefined;
    c.lock = undefined;
    emit();
  },
  reallocateToOriginalProctor(id: string) {
    const c = state.candidates.find((x) => x.id === id);
    if (!c || !c.proctorId) return;
    c.allocation = "allocated";
    c.reconnecting = false;
    c.disconnectReason = undefined;
    c.disconnectedAt = undefined;
    c.lock = undefined;
    emit();
  },
};
