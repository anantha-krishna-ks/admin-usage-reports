import { useEffect, useState } from "react";
import { greeterActions } from "./store";

const INTERVAL_MS = 30_000;

export function useAutoRefresh() {
  const [remaining, setRemaining] = useState(INTERVAL_MS / 1000);

  useEffect(() => {
    let elapsed = 0;
    const id = window.setInterval(() => {
      elapsed += 1;
      if (elapsed >= INTERVAL_MS / 1000) {
        elapsed = 0;
        greeterActions.tick();
      }
      setRemaining(INTERVAL_MS / 1000 - elapsed);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return remaining;
}
