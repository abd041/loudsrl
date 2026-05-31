export const revalidate = 3600;

type LocationResponse = {
  country: string;
  timezone: string;
  sunrise: string;
  sunset: string;
};

function todayAt(hour: number, minute: number, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((p) => p.type === "year")?.value ?? "2024";
  const month = parts.find((p) => p.type === "month")?.value ?? "01";
  const day = parts.find((p) => p.type === "day")?.value ?? "01";

  return new Date(`${year}-${month}-${day}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
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
      sunrise: todayAt(6, 30, timezone).toISOString(),
      sunset: todayAt(19, 30, timezone).toISOString(),
    };

    return Response.json(payload);
  } catch {
    return Response.json(
      { error: "Impossibile ottenere la posizione" },
      { status: 500 }
    );
  }
}
