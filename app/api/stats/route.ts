import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [total, byDevice, recent] = await Promise.all([
      prisma.visitor.count(),
      prisma.visitor.groupBy({
        by: ["device"],
        _count: { device: true },
      }),
      prisma.visitor.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { ip: true, device: true, userAgent: true, createdAt: true },
      }),
    ]);

    const deviceStats = byDevice.reduce<Record<string, number>>((acc, item) => {
      acc[item.device] = item._count.device;
      return acc;
    }, {});

    return NextResponse.json({
      total,
      byDevice: deviceStats,
      recent,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
