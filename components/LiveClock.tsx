"use client";

import { Loader2, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type GeoData = {
  country: string;
  timezone: string;
  sunrise: string;
  sunset: string;
};

type TimeParts = {
  time: string;
  meridiem: string;
  label: string;
};

function isGeoData(data: GeoData | { error?: string }): data is GeoData {
  return "timezone" in data && "country" in data;
}

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

function isDaytimeFromGeo(geoData: GeoData) {
  const now = new Date();
  const sunrise = new Date(geoData.sunrise);
  const sunset = new Date(geoData.sunset);
  return now >= sunrise && now <= sunset;
}

function isDaytimeFromTimezone(timezone: string) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
  return hour >= 6 && hour < 20;
}

export default function LiveClock({ isWhiteBg = false }: LiveClockProps) {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [timezone, setTimezone] = useState(browserTimezone);
  const [timeParts, setTimeParts] = useState<TimeParts | null>(null);
  const [loading, setLoading] = useState(true);
  const [daytime, setDaytime] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/location")
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as GeoData | { error?: string };
        if (!isGeoData(data)) return null;
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setGeoData(data);
          setTimezone(data.timezone);
        }
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      setTimeParts(formatLocalTime(timezone));
      setDaytime(
        geoData ? isDaytimeFromGeo(geoData) : isDaytimeFromTimezone(timezone)
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [geoData, timezone]);

  if (loading && !timeParts) {
    return (
      <div
        className={cn(
          "flex items-center justify-end",
          isWhiteBg ? "text-black" : "text-white"
        )}
      >
        <Loader2 size={16} className="animate-spin" aria-hidden />
      </div>
    );
  }

  if (!timeParts) return null;

  const iconColor = isWhiteBg ? "#000" : "#fff";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2",
        isWhiteBg ? "text-black" : "text-white"
      )}
    >
      <time
        dateTime={timeParts.label}
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
        {daytime ? (
          <Sun fill={iconColor} size={11} strokeWidth={0} />
        ) : (
          <Moon fill={iconColor} size={11} strokeWidth={0} />
        )}
      </span>
    </div>
  );
}
