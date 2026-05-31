"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type TimeParts = {
  time: string;
  meridiem: string;
  label: string;
};

type LiveClockProps = {
  isWhiteBg?: boolean;
};

function browserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function formatLocalTime(timezone: string): TimeParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date());

  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";
  const dayPeriod =
    parts.find((part) => part.type === "dayPeriod")?.value.toUpperCase() ?? "";

  const time = `${hour}:${minute}`;

  return {
    time,
    meridiem: dayPeriod,
    label: `${time} ${dayPeriod}`,
  };
}

/** Uses the visitor timezone only — reliable on UTC servers (Vercel) and locally. */
function isDaytimeInTimezone(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? 0
  );
  const totalMinutes = hour * 60 + minute;

  return totalMinutes >= 6 * 60 + 30 && totalMinutes < 19 * 60 + 30;
}

function ClockMoonIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="block"
    >
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.5 5.5 0 0 1-8.9-7.68A9 9 0 0 0 12 3z" />
    </svg>
  );
}

function ClockSunIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="block"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM12 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1zm0 20a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zM3.515 3.515a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414L3.515 4.93a1 1 0 0 1 0-1.415zM17.657 17.657a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414zM0 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1zm20 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1zM3.515 20.485a1 1 0 0 1 0-1.414l1.414-1.414a1 1 0 1 1 1.414 1.414l-1.414 1.414a1 1 0 0 1-1.414 0zM17.657 6.343a1 1 0 0 1 0-1.414l1.414-1.414a1 1 0 1 1 1.414 1.414l-1.414 1.414a1 1 0 0 1-1.414 0z"
      />
    </svg>
  );
}

export default function LiveClock({ isWhiteBg = false }: LiveClockProps) {
  const [timezone, setTimezone] = useState(browserTimezone);
  const [timeParts, setTimeParts] = useState<TimeParts>(() =>
    formatLocalTime(browserTimezone())
  );
  const [daytime, setDaytime] = useState(() =>
    isDaytimeInTimezone(browserTimezone())
  );

  useEffect(() => {
    let cancelled = false;

    fetch("/api/location")
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as { timezone?: string; error?: string };
        if (!data.timezone || data.error) return null;
        return data.timezone;
      })
      .then((resolvedTimezone) => {
        if (cancelled || !resolvedTimezone) return;
        setTimezone(resolvedTimezone);
      })
      .catch(() => {
        /* Keep browser timezone fallback */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      setTimeParts(formatLocalTime(timezone));
      setDaytime(isDaytimeInTimezone(timezone));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2",
        isWhiteBg ? "text-black" : "text-white"
      )}
    >
      <time
        dateTime={timeParts.label}
        suppressHydrationWarning
        className="whitespace-nowrap text-[0.8125rem] font-bold leading-none tracking-tight"
      >
        {timeParts.time}{" "}
        <span className="font-bold">{timeParts.meridiem}</span>
      </time>
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
          isWhiteBg ? "bg-black/10" : "bg-white/20"
        )}
        aria-hidden
      >
        {daytime ? <ClockSunIcon /> : <ClockMoonIcon />}
      </span>
    </div>
  );
}
