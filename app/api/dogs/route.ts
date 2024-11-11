// export const dynamic = "force-static";
import { getDogs } from "@/lib/db";
import { initializeDogs } from "@/lib/seed";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await initializeDogs();
    const dogs = await getDogs();
    return NextResponse.json(dogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dogs" },
      { status: 500 }
    );
  }
}
