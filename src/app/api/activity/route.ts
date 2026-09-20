import { NextResponse } from "next/server";
import { getActivityData } from "@/lib/activity";

export const revalidate = 3600;

export async function GET() {
  const data = await getActivityData();
  return NextResponse.json(data);
}
