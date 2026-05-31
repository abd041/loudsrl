export const revalidate = 3600;

type LocationResponse = {
  country: string;
  timezone: string;
  sunrise: string;
  sunset: string;
};

function localMinutesInTimezone(timezone: string, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

/** Convert a local time in `timezone` on today's calendar date to a UTC ISO string. */
function todayAt(hour: number, minute: number, timezone: string) {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = dateParts.find((p) => p.type === "year")?.value ?? "2024";
  const month = dateParts.find((p) => p.type === "month")?.value ?? "01";
  const day = dateParts.find((p) => p.type === "day")?.value ?? "01";

  const targetMinutes = hour * 60 + minute;
  let guess = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    hour,
    minute
  );

  for (let i = 0; i < 48; i++) {
    const currentMinutes = localMinutesInTimezone(timezone, new Date(guess));
    const diff = targetMinutes - currentMinutes;
    if (diff === 0) break;
    guess += diff * 60_000;
  }

  return new Date(guess).toISOString();
}

export async function GET() {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      headers: { "User-Agent": "loudsrl-clone" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Impossibile ottenere la posizione" },
        { status: 500 }
      );
    }

    const data = (await res.json()) as {
      country_code?: string;
      timezone?: string;
      error?: boolean;
      reason?: string;
    };

    if (data.error || !data.timezone) {
      return Response.json(
        { error: "Impossibile ottenere la posizione" },
        { status: 500 }
      );
    }

    const timezone = data.timezone;
    const country = data.country_code;

    if (!country) {
      return Response.json(
        { error: "Impossibile ottenere la posizione" },
        { status: 500 }
      );
    }

    const payload: LocationResponse = {
      country,
      timezone,
      sunrise: todayAt(6, 30, timezone),
      sunset: todayAt(19, 30, timezone),
    };

    return Response.json(payload);
  } catch {
    return Response.json(
      { error: "Impossibile ottenere la posizione" },
      { status: 500 }
    );
  }
}
