"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: site.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getTime = () => formatter.format(new Date());
const getHour = () => Number(getTime().slice(0, 2));

/**
 * The current time in Colombo. Renders nothing on the server (a fixed
 * placeholder), then the live time after hydration — so no mismatch.
 */
export function LocalTime({ fallback = "--:--" }: { fallback?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, () => fallback);
  return <time suppressHydrationWarning>{time}</time>;
}

/** "fireflies out" after dusk in Colombo, "mist lifting" in the morning… */
export function SkyNote() {
  const hour = useSyncExternalStore(subscribe, getHour, () => -1);
  if (hour < 0) return null;
  const note =
    hour >= 19 || hour < 5
      ? "fireflies out"
      : hour < 9
        ? "mist lifting"
        : hour < 16
          ? "sun on the tea"
          : "dusk coming in";
  return <span> · {note}</span>;
}
