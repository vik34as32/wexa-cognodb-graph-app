import { NextResponse } from "next/server";
import {driver} from "@/app/lib/db";

export async function GET() {
  try {
    await driver.verifyConnectivity();

    return NextResponse.json({
      success: true,
      message: "CognoDB connected successfully",
    });
  } catch (error) {
    console.error("CognoDB connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "CognoDB connection failed",
      },
      { status: 500 }
    );
  }
}