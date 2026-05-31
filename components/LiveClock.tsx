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

function isGeoData(data: GeoData | { error?: string }): data is GeoData {
  return "timezone" in data && "country" in data;
}

type LiveClockProps = {
  isWhiteBg?: boolean;
};

function browserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function formatLocalTime(timezone: string) {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
  });
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
  const [localTime, setLocalTime] = useState("");
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
      setLocalTime(formatLocalTime(timezone));
      setDaytime(
        geoData ? isDaytimeFromGeo(geoData) : isDaytimeFromTimezone(timezone)
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [geoData, timezone]);

  if (loading && !localTime) {
    return (
      <div
        className={cn(
          "flex w-full justify-end gap-2 text-[0.625rem] font-semibold",
          isWhiteBg ? "text-black" : "text-white"
        )}
      >
        <Loader2 size={14} className="animate-spin" aria-hidden />
      </div>
    );
  }

  const iconColor = isWhiteBg ? "#000" : "#fff";

  return (
    <div
      className={cn(
        "flex w-full items-center justify-end gap-2 text-[0.625rem] font-semibold",
        isWhiteBg ? "text-black" : "text-white"
      )}
    >
      {geoData?.country ? <p>{geoData.country.toUpperCase()}</p> : null}
      <p>{localTime}</p>
      <p
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full",
          isWhiteBg ? "bg-black/10" : "bg-white/20"
        )}
      >
        {daytime ? (
          <Sun fill={iconColor} size={10} aria-hidden />
        ) : (
          <Moon fill={iconColor} size={10} aria-hidden />
        )}
      </p>
    </div>
  );
}
