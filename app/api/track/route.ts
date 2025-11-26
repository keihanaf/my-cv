import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(ua)) {
    if (/tablet|ipad/i.test(ua)) return "tablet";
    return "mobile";
  }
  return "desktop";
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;
  return "unknown";
}

async function getLocationFromIP(ip: string) {
  if (ip === "unknown" || ip === "::1" || ip.startsWith("127.")) {
    return { country: "Local", city: "Development", region: null };
  }

  try {
    // استفاده از API رایگان ipapi.co
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) throw new Error("Failed to fetch location");

    const data = await response.json();
    return {
      country: data.country_name || null,
      city: data.city || null,
      region: data.region || null,
    };
  } catch (error) {
    console.error("Location fetch error:", error);
    return { country: null, city: null, region: null };
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "unknown";
    const device = getDeviceType(userAgent);

    // دریافت location
    const location = await getLocationFromIP(ip);

    await prisma.visitor.upsert({
      where: { ip_device: { ip, device } },
      update: {
        createdAt: new Date(),
        country: location.country,
        city: location.city,
        region: location.region,
      },
      create: {
        ip,
        device,
        userAgent,
        country: location.country,
        city: location.city,
        region: location.region,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
