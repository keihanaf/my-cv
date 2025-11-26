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

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "unknown";
    const device = getDeviceType(userAgent);

    await prisma.visitor.upsert({
      where: { ip_device: { ip, device } },
      update: { createdAt: new Date() },
      create: { ip, device, userAgent },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
